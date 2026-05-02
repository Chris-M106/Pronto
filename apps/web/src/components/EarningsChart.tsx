import { Card, AnimatedFadeIn } from 'ui';

interface EarningData {
  month: string;
  earnings: number;
}

const earningData: EarningData[] = [
  { month: 'Month 1', earnings: 300 },
  { month: 'Month 2', earnings: 650 },
  { month: 'Month 3', earnings: 950 },
  { month: 'Month 4', earnings: 1200 },
  { month: 'Month 5', earnings: 1400 },
  { month: 'Month 6', earnings: 1500 },
];

const maxEarnings = 1500;

export default function EarningsChart() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-light-bg">
      <div className="container-tight">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-navy mb-4">
            Provider Growth Potential
          </h2>
          <p className="text-xl text-text-light max-w-2xl mx-auto">
            See how your earnings can grow over time as you build your reputation.
          </p>
        </div>

        <AnimatedFadeIn>
          <Card className="p-8">
            <div className="flex items-end justify-around h-80 gap-4 mb-8">
              {earningData.map((data, idx) => (
                <div
                  key={data.month}
                  className="flex flex-col items-center gap-2 flex-1"
                >
                  <div className="relative flex-1 w-full flex items-end justify-center group">
                    <div
                      className="w-full bg-gradient-to-t from-blue to-teal rounded-t-lg transition-all duration-300 hover:shadow-lg hover:from-blue/90"
                      style={{
                        height: `${(data.earnings / maxEarnings) * 100}%`,
                        minHeight: '4px',
                      }}
                    >
                      <div className="hidden group-hover:block absolute -top-8 left-1/2 -translate-x-1/2 bg-navy text-white px-3 py-1 rounded text-sm whitespace-nowrap">
                        €{data.earnings}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-text-dark">
                    {data.month}
                  </span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue">€300</div>
                <div className="text-sm text-text-light">Starting</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-teal">€1,500</div>
                <div className="text-sm text-text-light">At 6 months</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber">400%</div>
                <div className="text-sm text-text-light">Growth</div>
              </div>
            </div>
          </Card>
        </AnimatedFadeIn>
      </div>
    </section>
  );
}
