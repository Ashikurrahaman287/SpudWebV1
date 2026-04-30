import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, MessageSquare, Mail, Send } from "lucide-react";
import { useContacts } from "@/contexts/ContactsContext";
import { useSEO } from "@/lib/seo";
import { Link } from "wouter";

const stages = [
  "Idea",
  "MVP",
  "Pre-TGE",
  "Launched",
  "Looking for Listing",
] as const;

const budgets = [
  "Under $5K",
  "$5K-$15K",
  "$15K-$50K",
  "$50K+",
] as const;

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  telegram: z.string().optional(),
  company: z.string().optional(),
  website: z.string().optional(),
  stage: z.string().min(1, "Select a stage"),
  budget: z.string().min(1, "Select a budget"),
  message: z.string().min(10, "Please write at least 10 characters"),
});

type FormValues = z.infer<typeof schema>;

export default function Contact() {
  useSEO("contact", {
    title: "Contact — SpudBlocks",
    description:
      "Reach the SpudBlocks operating team. Tell us about your token project, stage, and what you need.",
  });

  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { addContact } = useContacts();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      telegram: "",
      company: "",
      website: "",
      stage: "",
      budget: "",
      message: "",
    },
  });

  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = async (data: FormValues) => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      await addContact({
        name: data.name,
        email: data.email,
        phone: "",
        telegram: data.telegram || "",
        company: data.company || "",
        website: data.website || "",
        stage: data.stage,
        budget: data.budget,
        message: data.message,
        source: "contact",
      });
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or email us directly.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl text-center">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
              style={{
                background:
                  "linear-gradient(135deg, hsl(var(--brand-blue) / 0.15), hsl(var(--brand-violet) / 0.25))",
                border: "1px solid hsl(var(--brand-violet) / 0.4)",
              }}
            >
              <CheckCircle2
                className="w-10 h-10"
                style={{ color: "hsl(var(--brand-violet))" }}
              />
            </div>
            <h1 className="text-4xl font-bold tracking-tighter mb-4">
              Message Received
            </h1>
            <p className="text-muted-foreground mb-10">
              The SpudBlocks team will respond within 48 hours. For confidential
              launch discussions we will follow up via your provided channel.
            </p>
            <div className="flex justify-center gap-3">
              <Button asChild>
                <Link href="/">Return Home</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/services">Explore Services</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-32 pb-16 border-b border-border bg-card/30 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, hsl(var(--brand-violet) / 0.18), transparent 70%)",
          }}
        />
        <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center relative">
          <span className="font-mono text-xs tracking-widest text-primary uppercase mb-4 block">
            Contact
          </span>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6">
            Tell us about your launch.
          </h1>
          <p className="text-xl text-muted-foreground">
            Founders, ecosystem leads, and exchange partners — share your
            project details and we will respond within 48 hours.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl">
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <div className="border border-border bg-card p-5">
              <Mail className="w-4 h-4 text-primary mb-3" />
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">
                Email
              </div>
              <a href="mailto:hello@spudblocks.com" className="text-sm font-medium hover:text-primary">
                hello@spudblocks.com
              </a>
            </div>
            <div className="border border-border bg-card p-5">
              <MessageSquare className="w-4 h-4 text-primary mb-3" />
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">
                Apply
              </div>
              <Link href="/apply" className="text-sm font-medium hover:text-primary">
                Submit a full launch application →
              </Link>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 border border-border bg-card p-6 md:p-8">
              <div className="grid sm:grid-cols-2 gap-6">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Jane Doe" {...field} className="bg-background" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="jane@project.com" {...field} className="bg-background" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <FormField control={form.control} name="telegram" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telegram / WhatsApp</FormLabel>
                    <FormControl>
                      <Input placeholder="@handle or +1 555 0000" {...field} className="bg-background" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="company" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company / Project Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Acme Protocol" {...field} className="bg-background" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <FormField control={form.control} name="website" render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Website</FormLabel>
                  <FormControl>
                    <Input placeholder="https://yourproject.xyz" {...field} className="bg-background" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <div className="grid sm:grid-cols-2 gap-6">
                <FormField control={form.control} name="stage" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Stage</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-background">
                          <SelectValue placeholder="Select stage" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {stages.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="budget" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-background">
                          <SelectValue placeholder="Select budget" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {budgets.map((b) => (
                          <SelectItem key={b} value={b}>
                            {b}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <FormField control={form.control} name="message" render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your launch, timeline, and what you need."
                      className="min-h-[160px] bg-background"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              {submitError && (
                <p className="text-sm text-red-400 border border-red-500/30 bg-red-500/10 rounded px-4 py-3">
                  {submitError}
                </p>
              )}

              <Button
                type="submit"
                size="lg"
                className="w-full font-mono uppercase tracking-wider text-sm h-14"
                disabled={submitting}
              >
                {submitting ? "Sending..." : (
                  <>
                    Send Message <Send className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Confidential by default. We do not share inbound details with
                third parties.
              </p>
            </form>
          </Form>
        </div>
      </section>
    </div>
  );
}
