import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle2, Lock } from "lucide-react";
import { useContacts } from "@/contexts/ContactsContext";

const formSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  projectName: z.string().min(2, "Project name is required"),
  role: z.string().min(2, "Role is required"),
  url: z.string().url("Must be a valid URL (e.g., https://...)"),
  stage: z.string().min(1, "Please select a stage"),
  tgeTiming: z.string().min(1, "Please select timing"),
  chain: z.string().min(1, "Please specify chain/ecosystem"),
  productStatus: z.string().min(1, "Please describe product status"),
  communitySize: z.string().min(1, "Please estimate community size"),
  saleStructure: z.string().min(1, "Please describe raise/sale target"),
  kycStatus: z.string().min(1, "Please describe KYC compliance stance"),
  primaryNeed: z.string().min(1, "Please select primary need"),
  outcome: z.string().min(10, "Please provide more detail"),
  budget: z.string().min(1, "Please select budget range"),
  contactChannel: z.enum(["email", "telegram", "signal"]),
  additionalContext: z.string().optional()
});

type FormValues = z.infer<typeof formSchema>;

export default function Apply() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { addContact } = useContacts();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "", email: "", projectName: "", role: "", url: "",
      stage: "", tgeTiming: "", chain: "", productStatus: "", communitySize: "",
      saleStructure: "", kycStatus: "", primaryNeed: "", outcome: "",
      budget: "", contactChannel: "email", additionalContext: ""
    }
  });

  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await addContact({
        name: data.fullName,
        email: data.email,
        phone: "",
        telegram: "",
        company: data.projectName,
        website: data.url,
        stage: data.stage,
        budget: data.budget,
        message: `Project: ${data.projectName} (${data.role})\nURL: ${data.url}\nStage: ${data.stage} | TGE: ${data.tgeTiming} | Chain: ${data.chain}\nProduct: ${data.productStatus} | Community: ${data.communitySize}\nSale: ${data.saleStructure} | KYC: ${data.kycStatus}\nNeed: ${data.primaryNeed} | Budget: ${data.budget}\nOutcome: ${data.outcome}\nContact: ${data.contactChannel}\nContext: ${data.additionalContext || "N/A"}`,
        source: "apply",
      });
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or email us directly.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8 text-primary">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold tracking-tighter mb-6">Application Received</h1>
          <p className="text-xl text-muted-foreground mb-12">Your information has been securely transmitted to our operating team.</p>
          
          <div className="text-left border border-border bg-card p-8">
            <h3 className="font-bold text-lg mb-6 border-b border-border pb-4">What happens next?</h3>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:h-full before:w-0.5 before:bg-border">
              {[
                { step: "48-Hour Review", desc: "Our operators review your submission against our qualification matrix." },
                { step: "Qualification Call", desc: "If aligned, we schedule a 45-minute technical scoping session." },
                { step: "Scope Proposal", desc: "We present a milestone-based timeline and resource requirement." },
                { step: "Engagement", desc: "Contracts signed, onboarding begins within 7 days." }
              ].map((item, i) => (
                <div key={i} className="relative flex items-start">
                  <div className="w-6 h-6 rounded-full border-2 border-background bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0 mr-4 z-10">{i+1}</div>
                  <div>
                    <div className="font-bold text-sm">{item.step}</div>
                    <div className="text-sm text-muted-foreground">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <Button asChild className="mt-12">
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-32 pb-12 border-b border-border bg-card/30">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6">Apply for Review</h1>
          <p className="text-xl text-muted-foreground mb-8">Submit your project for operational qualification.</p>
          
          <div className="inline-flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm font-mono text-muted-foreground border border-border bg-card p-4">
            <div className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-primary" /> Active Roadmap Req.</div>
            <div className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-primary" /> KYC/AML Willingness</div>
            <div className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-primary" /> Min 60 Days Pre-TGE</div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="mb-8 p-4 bg-muted/50 border border-border text-sm text-muted-foreground flex items-start gap-3">
            <Lock className="w-5 h-5 shrink-0" />
            <div>All submissions are treated as strictly confidential. We do not share technical architectures or tokenomic models outside our core operating team.</div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
              
              {/* Contact Block */}
              <div className="space-y-6">
                <div className="border-b border-border pb-2 mb-6">
                  <h2 className="text-xl font-bold font-mono tracking-tight">01 / Contact</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <FormField control={form.control} name="fullName" render={({ field }) => (
                    <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="Jane Doe" {...field} className="bg-card" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>Work Email</FormLabel><FormControl><Input type="email" placeholder="jane@project.com" {...field} className="bg-card" /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <FormField control={form.control} name="projectName" render={({ field }) => (
                    <FormItem><FormLabel>Project Name</FormLabel><FormControl><Input placeholder="Nexus Protocol" {...field} className="bg-card" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="role" render={({ field }) => (
                    <FormItem><FormLabel>Role / Decision Authority</FormLabel><FormControl><Input placeholder="Founder / CEO" {...field} className="bg-card" /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="url" render={({ field }) => (
                  <FormItem><FormLabel>Website or Deck URL</FormLabel><FormControl><Input type="url" placeholder="https://..." {...field} className="bg-card" /></FormControl><FormMessage /></FormItem>
                )} />
              </div>

              {/* Stage Block */}
              <div className="space-y-6">
                <div className="border-b border-border pb-2 mb-6">
                  <h2 className="text-xl font-bold font-mono tracking-tight">02 / Stage & Timing</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <FormField control={form.control} name="stage" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Stage</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger className="bg-card"><SelectValue placeholder="Select stage" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="seed">Seed Funded</SelectItem>
                          <SelectItem value="series_a">Series A</SelectItem>
                          <SelectItem value="live_token">Live Token (Re-launch)</SelectItem>
                          <SelectItem value="bootstrapped">Bootstrapped / Self-Funded</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="tgeTiming" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target TGE Timing</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger className="bg-card"><SelectValue placeholder="Select timing" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="q1_2025">Q1 2025</SelectItem>
                          <SelectItem value="q2_2025">Q2 2025</SelectItem>
                          <SelectItem value="q3_2025">Q3 2025</SelectItem>
                          <SelectItem value="q4_2025">Q4 2025</SelectItem>
                          <SelectItem value="undecided">Undecided</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <FormField control={form.control} name="chain" render={({ field }) => (
                    <FormItem><FormLabel>Primary Chain / Ecosystem</FormLabel><FormControl><Input placeholder="Ethereum, Solana, Cosmos..." {...field} className="bg-card" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="productStatus" render={({ field }) => (
                    <FormItem><FormLabel>Current Product Status</FormLabel><FormControl><Input placeholder="Live Testnet, Mainnet beta..." {...field} className="bg-card" /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
              </div>

              {/* Specifics Block */}
              <div className="space-y-6">
                <div className="border-b border-border pb-2 mb-6">
                  <h2 className="text-xl font-bold font-mono tracking-tight">03 / Operations</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <FormField control={form.control} name="communitySize" render={({ field }) => (
                    <FormItem><FormLabel>Current Community Size</FormLabel><FormControl><Input placeholder="e.g. 10k Twitter, 5k Discord" {...field} className="bg-card" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="saleStructure" render={({ field }) => (
                    <FormItem><FormLabel>Target Raise / Sale Structure</FormLabel><FormControl><Input placeholder="e.g. $5M Public Node Sale" {...field} className="bg-card" /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="kycStatus" render={({ field }) => (
                  <FormItem><FormLabel>KYC & Compliance Stance</FormLabel><FormControl><Input placeholder="e.g. Requiring full KYC for public sale" {...field} className="bg-card" /></FormControl><FormMessage /></FormItem>
                )} />
              </div>

              {/* Engagement Block */}
              <div className="space-y-6">
                <div className="border-b border-border pb-2 mb-6">
                  <h2 className="text-xl font-bold font-mono tracking-tight">04 / Engagement Scope</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <FormField control={form.control} name="primaryNeed" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary Need</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger className="bg-card"><SelectValue placeholder="Select primary need" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="full_system">Full Launch System (End-to-end)</SelectItem>
                          <SelectItem value="technical">Technical Build (Dashboards, UX)</SelectItem>
                          <SelectItem value="growth">Growth Engine (Narrative, Activation)</SelectItem>
                          <SelectItem value="exchange">Exchange Readiness (Compliance, Strategy)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="budget" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Operational Budget Range (Fiat)</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger className="bg-card"><SelectValue placeholder="Select budget range" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="under_50k">Under $50k</SelectItem>
                          <SelectItem value="50k_150k">$50k - $150k</SelectItem>
                          <SelectItem value="150k_plus">$150k+</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                
                <FormField control={form.control} name="outcome" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Desired 90-Day Outcome</FormLabel>
                    <FormControl><Textarea placeholder="What does success look like? Be specific." className="min-h-[100px] bg-card" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="additionalContext" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Context (Optional)</FormLabel>
                    <FormControl><Textarea placeholder="Any other details we should know before the call?" className="min-h-[80px] bg-card" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="contactChannel" render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Preferred Contact Channel</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl><RadioGroupItem value="email" /></FormControl>
                          <FormLabel className="font-normal">Email</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl><RadioGroupItem value="telegram" /></FormControl>
                          <FormLabel className="font-normal">Telegram</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl><RadioGroupItem value="signal" /></FormControl>
                          <FormLabel className="font-normal">Signal</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <div className="pt-8 border-t border-border space-y-4">
                {submitError && (
                  <p className="text-sm text-red-400 border border-red-500/30 bg-red-500/10 rounded px-4 py-3">
                    {submitError}
                  </p>
                )}
                <Button type="submit" size="lg" className="w-full sm:w-auto h-14 px-8 font-mono uppercase tracking-wider text-sm" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting securely..." : "Submit Application"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </section>
    </div>
  );
}
