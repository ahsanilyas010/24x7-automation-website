import { CtaBand, PageHero, SectionHead, BookDemoButton } from '@/components/ui';
import { ChannelCards } from '@/components/sections';
import DashboardPreview from '@/components/DashboardPreview';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Channels: WhatsApp, email, Facebook, Instagram and LinkedIn',
  description: 'Connect multiple WhatsApp numbers, email inboxes, Facebook, Instagram and LinkedIn. Every channel gets its own folder in one dashboard, so notifications stay calm.',
  path: '/channels',
});

export default function Page() {
  return (
    <>
      <PageHero trail={[{ name: 'Channels', path: '/channels' }]} eyebrow="Channels" title="Multiple channels. One dashboard." lead="Connect every place your customers write to you. Each channel keeps its own colour and its own folder, so messages go to the right place instead of piling up in one noisy inbox.">
        <BookDemoButton large />
      </PageHero>
      <section className="wrap" style={{ paddingBottom: 'var(--sec-md)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,380px),1fr))', gap: 48, alignItems: 'start' }}>
        <ChannelCards long />
        <div className="sticky-lg" style={{ position: 'sticky', top: 96 }} data-reveal="120"><DashboardPreview caption="Messages are filed by channel. Your notifications stay managed." /></div>
      </section>
      <section style={{ background: '#FFFFFF', borderTop: '1px solid #E0DBD1', borderBottom: '1px solid #E0DBD1' }}>
        <div className="wrap" style={{ paddingTop: 'var(--sec-md)', paddingBottom: 'var(--sec-md)', display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 900 }}>
          <SectionHead eyebrow="Less stress" title="No more ting, ting, ting." />
          <div className="prose" data-reveal="100">
            <p>Seven notifications from seven places make anyone anxious. With 24x7 Automation, two WhatsApp messages, three emails and two Instagram messages do not become seven alerts. Each goes into its own category on your dashboard, where it is drafted, prioritised and waiting.</p>
            <p>When you want to check WhatsApp, you open the WhatsApp folder, deal with it and come out again. Then you open email. The system takes the information in and tells you, when you choose to look, what needs a response now.</p>
            <p>Connect as many accounts as your business uses: several Gmail, Outlook or Hotmail inboxes, more than one WhatsApp number, and your Facebook, Instagram and LinkedIn business accounts, all in one place.</p>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
