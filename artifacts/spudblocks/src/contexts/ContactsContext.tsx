import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { type ContactSubmission } from "@/lib/storage";
import {
  createContactApi,
  listContactsApi,
  patchContactStatusApi,
  deleteContactApi,
  type CreateContactPayload,
} from "@/lib/api";
import { useAdmin } from "./AdminContext";

type ContactsContextType = {
  contacts: ContactSubmission[];
  loading: boolean;
  error: string | null;
  addContact: (sub: CreateContactPayload) => Promise<void>;
  updateContactStatus: (
    id: string,
    status: ContactSubmission["status"],
  ) => Promise<void>;
  deleteContact: (id: string) => Promise<void>;
  refresh: () => Promise<void>;
};

const ContactsContext = createContext<ContactsContextType | null>(null);

export function ContactsProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAdmin();
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!isAuthenticated) {
      setContacts([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const list = await listContactsApi();
      setContacts(list);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load contacts");
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const addContact = useCallback(async (sub: CreateContactPayload) => {
    const created = await createContactApi(sub);
    setContacts((prev) => [created, ...prev]);
  }, []);

  const updateContactStatus = useCallback(
    async (id: string, status: ContactSubmission["status"]) => {
      const updated = await patchContactStatusApi(id, status);
      setContacts((prev) => prev.map((c) => (c.id === id ? updated : c)));
    },
    [],
  );

  const deleteContact = useCallback(async (id: string) => {
    await deleteContactApi(id);
    setContacts((prev) => prev.filter((c) => c.id !== id));
  }, []);

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        loading,
        error,
        addContact,
        updateContactStatus,
        deleteContact,
        refresh,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
}

export function useContacts(): ContactsContextType {
  const ctx = useContext(ContactsContext);
  if (!ctx) throw new Error("useContacts must be used inside ContactsProvider");
  return ctx;
}
