import { Check, Zap, Star, Building2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface PricingProps {
  onNavigate: (page: string) => void;
}

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for trying out SnapCut AI',
    icon: Zap,
    popular: false,
    features: [
      '5 background removals per day',
      'Standard quality output',
      'PNG download',
      'JPG, PNG, WEBP support',
      'No credit card required',
      'Browser-based processing',
    ],
    cta: 'Get Started Free',
    ctaVariant: 'outline' as const,
  },
  {
    name: 'Pro',
    price: '$9.99',
    period: 'per month',
    description: 'For creators and professionals',
    icon: Star,
    popular: true,
    features: [
      'Unlimited background removals',
      'HD quality output',
      'Priority processing',
      'All file formats supported',
      'Batch processing (up to 10)',
      'Advanced edge detection',
      'Email support',
    ],
    cta: 'Start Pro Plan',
    ctaVariant: 'default' as const,
  },
  {
    name: 'Business',
    price: '$29.99',
    period: 'per month',
    description: 'For teams and enterprises',
    icon: Building2,
    popular: false,
    features: [
      'Everything in Pro',
      'API access',
      'Bulk processing (unlimited)',
      'Dedicated support',
      'Custom integrations',
      'SLA guarantee',
      'Team management',
    ],
    cta: 'Contact Sales',
    ctaVariant: 'outline' as const,
  },
];

export default function Pricing({ onNavigate }: PricingProps) {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon/10 border border-neon/20 text-neon text-xs font-semibold uppercase tracking-widest mb-4">
            Pricing
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Simple, <span className="text-neon">Transparent</span> Pricing
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Start free, upgrade when you need more. No hidden fees, cancel anytime.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-7 flex flex-col transition-all duration-300 ${
                plan.popular
                  ? 'glass-card-neon scale-[1.02] shadow-neon'
                  : 'glass-card hover:border-neon/20'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge className="bg-neon text-background font-bold px-4 py-1 text-xs uppercase tracking-wider shadow-neon">
                    Most Popular
                  </Badge>
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  plan.popular ? 'bg-neon/20 border border-neon/40' : 'bg-surface-raised border border-border/40'
                }`}>
                  <plan.icon className={`w-6 h-6 ${plan.popular ? 'text-neon' : 'text-muted-foreground'}`} />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-1">{plan.name}</h3>
                <p className="text-muted-foreground text-sm">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className={`font-display text-4xl font-bold ${plan.popular ? 'text-neon' : 'text-foreground'}`}>
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground text-sm">/{plan.period}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      plan.popular ? 'bg-neon/20' : 'bg-surface-raised'
                    }`}>
                      <Check className={`w-3 h-3 ${plan.popular ? 'text-neon' : 'text-muted-foreground'}`} />
                    </div>
                    <span className="text-sm text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                onClick={() => onNavigate('tool')}
                className={`w-full rounded-xl h-11 font-semibold gap-2 ${
                  plan.popular
                    ? 'neon-btn'
                    : 'border-border/60 hover:border-neon/40 hover:text-neon'
                }`}
                variant={plan.popular ? 'default' : 'outline'}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Pay-per-use note */}
        <div className="text-center glass-card rounded-2xl p-6 max-w-lg mx-auto">
          <p className="text-foreground font-medium mb-1">
            💳 Need more? Buy credits
          </p>
          <p className="text-muted-foreground text-sm">
            Pay only for what you use — <span className="text-neon font-semibold">$0.10 per image</span>.
            No subscription required.
          </p>
        </div>

        {/* FAQ Teaser */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground text-sm">
            Have questions?{' '}
            <button
              onClick={() => onNavigate('faq')}
              className="text-neon hover:underline font-medium"
            >
              Check our FAQ
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
