import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CheckCircle2, MessageSquare } from "lucide-react";
import { useContacts } from "@/contexts/ContactsContext";
import { Link } from "wouter";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Please write at least 10 characters"),
});

type FormValues = z.infer<typeof schema>;

export default function Contact() {
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { addContact } = useContacts();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  const onSubmit = async (data: FormValues) => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    addContact({
      name: data.name,
      email: data.email,
      phone: data.phone || "",
      message: data.message,
    });
    setSubmitting(false);
    setSuccess(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (success) {
    return (
      <div className="flex flex-col min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl text-center">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8 text-primary">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold tracking-tighter mb-4">Message Sent</h1>
            <p className="text-muted-foreground mb-10">
              Thank you for reaching out. Our team will get back to you within 48 hours.
            </p>
            <Button asChild>
              <Link href="/">Return Home</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-32 pb-16 border-b border-border bg-card/30">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
          <span className="font-mono text-xs tracking-widest text-primary uppercase mb-4 block">Contact</span>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6">Get in Touch</h1>
          <p className="text-xl text-muted-foreground">
            Have a question or want to learn more? Send us a message and we'll respond within 48 hours.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl">
          <div className="border border-border bg-card p-8 mb-8">
            <div className="flex items-center gap-3 mb-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              <span className="font-mono text-sm font-bold">Direct Message</span>
            </div>
            <p className="text-sm text-muted-foreground">
              For project-specific inquiries, use the{" "}
              <Link href="/apply" className="text-primary hover:underline">Apply page</Link> to submit a full application.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl><Input placeholder="Jane Doe" {...field} className="bg-card" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl><Input type="email" placeholder="jane@company.com" {...field} className="bg-card" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone (optional)</FormLabel>
                  <FormControl><Input type="tel" placeholder="+1 (555) 000-0000" {...field} className="bg-card" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="message" render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us what's on your mind..."
                      className="min-h-[160px] bg-card"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <Button type="submit" size="lg" className="w-full font-mono uppercase tracking-wider text-sm h-14" disabled={submitting}>
                {submitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Form>
        </div>
      </section>
    </div>
  );
}
