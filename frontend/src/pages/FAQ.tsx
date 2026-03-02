import { HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'What image formats does SnapCut AI support?',
    answer:
      'SnapCut AI supports JPG (JPEG), PNG, and WEBP image formats. You can upload any of these formats and the result will always be downloaded as a transparent PNG file, which is the standard format for images with transparent backgrounds.',
  },
  {
    question: 'How long does background removal take?',
    answer:
      'Processing typically takes between 2–5 seconds depending on the size and complexity of your image. Our AI analyzes the image locally in your browser, so there\'s no upload time to a server. Larger images (close to the 10MB limit) may take slightly longer.',
  },
  {
    question: 'Are my images stored or shared with anyone?',
    answer:
      'No. SnapCut AI processes all images entirely within your browser using client-side technology. Your images are never uploaded to any server, never stored, and never shared with third parties. Once you close the tab, all image data is cleared from memory.',
  },
  {
    question: 'What does the free plan include?',
    answer:
      'The free plan gives you 5 background removals per day at standard quality. No credit card is required to use the free plan. You can upload JPG, PNG, or WEBP images up to 10MB and download the result as a transparent PNG.',
  },
  {
    question: 'How do I upgrade to a paid plan?',
    answer:
      'You can upgrade to the Pro plan ($9.99/month) or Business plan ($29.99/month) from the Pricing page. Pro gives you unlimited removals, HD quality, and priority processing. Business adds API access, bulk processing, and dedicated support. Click "Start Pro Plan" on the Pricing page to get started.',
  },
  {
    question: 'Is my data private and secure?',
    answer:
      'Absolutely. Privacy is our top priority. All image processing happens locally in your browser — no data leaves your device. We do not collect, store, or analyze your images. The only data we track is an anonymous aggregate count of total images processed (no personal information).',
  },
  {
    question: 'What is the maximum file size I can upload?',
    answer:
      'The maximum file size is 10MB per image. If your image is larger than this, you\'ll need to compress or resize it before uploading. Most standard photos and product images are well within this limit.',
  },
  {
    question: 'Can I use SnapCut AI for commercial purposes?',
    answer:
      'Yes! Images processed with SnapCut AI can be used for any purpose, including commercial use such as e-commerce product listings, marketing materials, social media content, and more. There are no restrictions on how you use the output images.',
  },
  {
    question: 'What happens if the background removal isn\'t perfect?',
    answer:
      'Our AI works best on images with clear contrast between the subject and background. For complex images with similar colors between subject and background, results may vary. We recommend using images with solid or simple backgrounds for the best results. Future updates will improve edge detection accuracy.',
  },
];

export default function FAQ() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon/10 border border-neon/20 text-neon text-xs font-semibold uppercase tracking-widest mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            FAQ
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Frequently Asked <span className="text-neon">Questions</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Everything you need to know about SnapCut AI. Can't find your answer?{' '}
            <a href="mailto:support@snapcut.ai" className="text-neon hover:underline">
              Contact us
            </a>
            .
          </p>
        </div>

        {/* Accordion */}
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="glass-card rounded-xl border border-border/40 px-6 hover:border-neon/20 transition-colors data-[state=open]:border-neon/30 data-[state=open]:bg-neon/3"
            >
              <AccordionTrigger className="text-left font-display font-semibold text-foreground hover:text-neon hover:no-underline py-5 text-base">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
