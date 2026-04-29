import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import {
  getContacts,
  addContact as storageAddContact,
  updateContactStatus as storageUpdateStatus,
  deleteContact as storageDeleteContact,
  type ContactSubmission,
} from "@/lib/storage";

type ContactsContextType = {
  contacts: ContactSubmission[];
  addContact: (sub: Omit<ContactSubmission, "id" | "submittedAt" | "status">) => void;
  updateContactStatus: (id: string, status: ContactSubmission["status"]) => void;
  deleteContact: (id: string) => void;
  refresh: () => void;
};

const ContactsContext = createContext<ContactsContextType | null>(null);

export function ContactsProvider({ children }: { children: ReactNode }) {
  const [contacts, setContacts] = useState<ContactSubmission[]>(() => getContacts());

  const refresh = useCallback(() => {
    setContacts(getContacts());
  }, []);

  const addContact = useCallback(
    (sub: Omit<ContactSubmission, "id" | "submittedAt" | "status">) => {
      storageAddContact(sub);
      // Immediately reflect in shared state — no re-read needed
      setContacts((prev) => [
        {
          ...sub,
          id: Date.now().toString(),
          submittedAt: new Date().toISOString(),
          status: "new" as const,
        },
        ...prev,
      ]);
    },
    []
  );

  const updateContactStatus = useCallback(
    (id: string, status: ContactSubmission["status"]) => {
      storageUpdateStatus(id, status);
      setContacts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status } : c))
      );
    },
    []
  );

  const deleteContact = useCallback((id: string) => {
    storageDeleteContact(id);
    setContacts((prev) => prev.filter((c) => c.id !== id));
  }, []);

  return (
    <ContactsContext.Provider
      value={{ contacts, addContact, updateContactStatus, deleteContact, refresh }}
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
