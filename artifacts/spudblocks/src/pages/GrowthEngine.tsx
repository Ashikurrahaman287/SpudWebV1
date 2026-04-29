import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { name: 'Week 1', qualified: 400, kyc: 240 },
  { name: 'Week 2', qualified: 800, kyc: 450 },
  { name: 'Week 3', qualified: 1500, kyc: 980 },
  { name: 'Week 4', qualified: 2800, kyc: 1900 },
  { name: 'Week 5', qualified: 4200, kyc: 3100 },
  { name: 'Week 6', qualified: 8500, kyc: 6800 },
];

export default function GrowthEngine() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-32 pb-20 border-b border-border bg-card/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl">
            <div className="text-primary font-mono text-sm uppercase mb-4 tracking-wider">Solution Pillar</div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">Growth Engine</h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl">
              Narrative design, community activation, and verifiable traction metrics. We build retention loops, not hype spikes.
            </p>
            <Button asChild size="lg" className="h-12 px-8 font-mono uppercase tracking-wider text-sm">
              <Link href="/apply">Activate Growth</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24 border-b border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6">Optimizing for qualified liquidity.</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Vanity metrics kill launches. A Discord with 100k bots yields $0 in TVL. We track the 'Qualified Application Funnel'—users who have passed KYC, connected a wallet with history, and engaged meaningfully.
              </p>
              <ul className="space-y-6 mt-8">
                <li className="border-l-2 border-primary pl-4">
                  <div className="font-bold text-lg">Narrative & Positioning</div>
                  <div className="text-muted-foreground">Clear, operator-grade market positioning that resonates with institutional and sophisticated retail capital.</div>
                </li>
                <li className="border-l-2 border-primary/50 pl-4">
                  <div className="font-bold text-lg">Content & Campaigns</div>
                  <div className="text-muted-foreground">Founder-led content engines and structured campaigns that drive verifiable on-chain actions.</div>
                </li>
                <li className="border-l-2 border-primary/20 pl-4">
                  <div className="font-bold text-lg">Retention Loops</div>
                  <div className="text-muted-foreground">Mechanisms that convert early interest into long-term holders through aligned incentives.</div>
                </li>
              </ul>
            </div>
            
            <div className="border border-border bg-card p-6 rounded-lg">
              <div className="flex justify-between items-center mb-6">
                <div className="font-mono text-sm tracking-wider uppercase">Traction Dashboard</div>
                <div className="text-xs text-primary font-mono bg-primary/10 px-2 py-1 rounded">Live Data</div>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis dataKey="name" stroke="#666" tick={{fontSize: 12}} />
                    <YAxis stroke="#666" tick={{fontSize: 12}} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '4px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Bar dataKey="qualified" name="Qualified Users" fill="#333" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="kyc" name="KYC Completed" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-border">
                <div>
                  <div className="text-xs text-muted-foreground uppercase">Conv. Rate</div>
                  <div className="text-2xl font-mono font-bold text-primary">80.0%</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase">MoM Growth</div>
                  <div className="text-2xl font-mono font-bold">+118%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
