export type ChannelKey = 'wa' | 'email' | 'sms';

export const CH: Record<ChannelKey, { l: string; c: string; t: string }> = {
  wa: { l: 'WhatsApp', c: '#0F7A45', t: '#E3F4EA' },
  email: { l: 'Email', c: '#2457C5', t: '#E7EEFB' },
  sms: { l: 'SMS', c: '#7A4A9A', t: '#F2EAF7' },
};

export type Industry = { name: string; ch: ChannelKey; who: string; ask: string; reply: string; stages: string[] };

export const IND: Industry[] = [
  { name: 'Construction and trades', ch: 'wa', who: 'Sarah, Leeds', ask: 'Can you quote for a rear extension, about 4m by 5m?', reply: 'Thanks Sarah. We offer a free site visit first. Would Thursday at 10:00 or Friday at 14:00 suit you?', stages: ['New', 'Qualified', 'Site visit', 'Quoted', 'Won', 'Lost'] },
  { name: 'Home services', ch: 'wa', who: 'Priya, Salford', ask: 'Boiler is making a banging noise. Can someone come today?', reply: 'Sorry to hear that, Priya. We have an engineer free at 15:00 today. Our callout fee is £65 and covers the first hour.', stages: ['New', 'Qualified', 'Booked', 'Job done', 'Invoiced', 'Lost'] },
  { name: 'Clinics and dental', ch: 'sms', who: 'Patient, Bristol', ask: 'Do you have a hygienist appointment this week?', reply: 'We have Wednesday at 09:15 or Friday at 10:30. Reply 1 or 2 and we will book it.', stages: ['New', 'Triage', 'Booked', 'Attended', 'Recall', 'Lost'] },
  { name: 'Salons and beauty', ch: 'wa', who: 'Chloe, Brighton', ask: 'How much for a full head of highlights?', reply: 'From £95 depending on length. A quick consultation first is free. Would Saturday at 11:00 work?', stages: ['New', 'Consultation', 'Booked', 'Visited', 'Rebook', 'Lost'] },
  { name: 'Real estate', ch: 'email', who: 'Daniel, Reading', ask: 'Is the 3 bed on Elm Road still available to view?', reply: 'Yes, it is. Viewings are open Tuesday and Thursday evenings. Shall I book you in for Tuesday at 18:00?', stages: ['New', 'Qualified', 'Viewing', 'Offer', 'Agreed', 'Lost'] },
  { name: 'Legal and accounting', ch: 'email', who: 'Helen, Cardiff', ask: 'I need help with my self assessment this year.', reply: 'Happy to help, Helen. Our fixed fee starts at £250. I can arrange a 15 minute call to check what you need.', stages: ['New', 'Checks', 'Consultation', 'Engaged', 'Closed', 'Lost'] },
  { name: 'Restaurants and hospitality', ch: 'wa', who: 'Ravi, Birmingham', ask: 'Table for 14 on Saturday the 17th?', reply: 'We can seat 14 at 19:30. Groups over 10 need a £10 per head deposit. Shall I hold it for you?', stages: ['New', 'Enquiry', 'Held', 'Confirmed', 'Seated', 'Lost'] },
  { name: 'Automotive and garages', ch: 'sms', who: 'Gary, Norwich', ask: 'Need an MOT and a look at my brakes.', reply: 'We can do both on Monday. MOT is £54.85, brake check is free with it. Drop off by 08:30.', stages: ['New', 'Diagnosed', 'Quoted', 'Booked in', 'Collected', 'Lost'] },
  { name: 'Education and tutoring', ch: 'email', who: 'Parent, Oxford', ask: 'Do you offer GCSE maths tutoring online?', reply: 'Yes, online and in person. The first lesson is a trial at half price. Which evenings suit your child?', stages: ['New', 'Assessment', 'Trial lesson', 'Enrolled', 'Renewed', 'Lost'] },
  { name: 'Fitness studios', ch: 'wa', who: 'Aisha, Glasgow', ask: 'Can I try a class before joining?', reply: 'Of course. Your first class is free. There is space at Tuesday 18:30 reformer or Thursday 07:00 HIIT.', stages: ['New', 'Trial booked', 'Trial attended', 'Member', 'Renewed', 'Lost'] },
];

export type Msg = { f: 'c' | 'ai' | 'y' | 's'; t: string; clause?: string };
export type UseCase = { title: string; desc: string; who: string; ch: ChannelKey; msgs: Msg[] };

export const UC: UseCase[] = [
  { title: 'After-hours enquiries', desc: 'Replies at 23:40 so the lead is still warm at 08:00.', who: 'Sarah Hughes', ch: 'wa', msgs: [
    { f: 'c', t: 'Hi, are you free to quote for a rear extension? About 4m by 5m.' },
    { f: 'ai', t: 'Hi Sarah, thanks for getting in touch. We start with a free site visit. Would Thursday at 10:00 or Friday at 14:00 suit you?' },
    { f: 'c', t: 'Thursday works.' },
    { f: 'ai', t: 'Booked for Thursday at 10:00. You will get a reminder the day before.' },
    { f: 's', t: 'Stage moved from New to Site visit' }] },
  { title: 'Complaint replies from your terms', desc: 'Drafts a calm reply and shows the clause it used.', who: 'Mark Patel', ch: 'email', msgs: [
    { f: 'c', t: 'I was charged a £65 callout fee. Nobody told me about this.' },
    { f: 's', t: 'Complaint detected · drafted for approval' },
    { f: 'ai', t: 'Hi Mark, sorry for the frustration. The callout fee covers the first hour on site and is set out in our terms, sent with your booking.', clause: 'Terms · Clause 4.2 Callout fees' },
    { f: 's', t: 'You approved and sent · 09:12' }] },
  { title: 'Needs you, one day at a time', desc: 'Only decisions reach you, each with four one tap actions.', who: 'Tom Reid', ch: 'email', msgs: [
    { f: 'c', t: 'Can you match another quote? It came in £800 lower.' },
    { f: 's', t: 'Added to Needs you · price decision' },
    { f: 'y', t: 'We can take £400 off if you confirm this week.' },
    { f: 's', t: 'Marked Follow up · Fri 2 Oct' }] },
  { title: 'Delegate to your team', desc: 'Hands the job to the right person and tells the customer.', who: 'Priya Shah', ch: 'wa', msgs: [
    { f: 'c', t: 'The tap you fitted last week is dripping again.' },
    { f: 'ai', t: 'Sorry about that, Priya. I have passed this to Dan, who fitted it. He will message you today to arrange a time.' },
    { f: 's', t: 'Delegated to Dan · due today' }] },
  { title: 'Follow ups that happen', desc: 'Quotes are chased on schedule, in your wording.', who: 'Jo Evans', ch: 'sms', msgs: [
    { f: 's', t: 'Quote sent 5 days ago · no reply' },
    { f: 'ai', t: 'Hi Jo, just checking you received our quote for the bathroom refit. Happy to answer any questions.' },
    { f: 'c', t: 'Yes thanks. Can we start in November?' },
    { f: 's', t: 'Stage moved from Quoted to Won' }] },
  { title: 'Save edits as templates', desc: 'Edit a draft once and reuse it next time.', who: 'Amy Clarke', ch: 'sms', msgs: [
    { f: 'c', t: 'Can I move my appointment to Friday?' },
    { f: 'ai', t: 'Of course. We have Friday at 10:30 or 15:15. Parking is free behind the building.' },
    { f: 's', t: 'You edited the draft · saved as template Rebooking' },
    { f: 'c', t: '10:30 please.' }] },
];

export type HeroItem = { ch: ChannelKey; who: string; txt: string; t: string; o: 'ai' | 'won' | 'del' | 'needs'; ol: string };

export const HERO: HeroItem[] = [
  { ch: 'wa', who: 'Sarah Hughes', txt: 'Can you quote for a rear extension?', t: '23:41', o: 'ai', ol: 'AI replied' },
  { ch: 'email', who: 'Mark Patel', txt: 'Why was I charged a callout fee?', t: '00:17', o: 'ai', ol: 'Clause 4.2 cited' },
  { ch: 'sms', who: 'Jo Evans', txt: 'Can we start in November?', t: '01:52', o: 'won', ol: 'Moved to Won' },
  { ch: 'wa', who: 'Priya Shah', txt: 'The tap is dripping again', t: '03:08', o: 'del', ol: 'Delegated to Dan' },
  { ch: 'email', who: 'Tom Reid', txt: 'Can you match a lower quote?', t: '06:30', o: 'needs', ol: 'Needs you' },
  { ch: 'sms', who: 'Amy Clarke', txt: 'Running 10 minutes late', t: '07:55', o: 'ai', ol: 'AI replied' },
];

export const OUT: Record<HeroItem['o'], [string, string]> = {
  ai: ['#0B7282', '#E2F2F4'],
  won: ['#3B6E2A', '#EAF2E4'],
  del: ['#4B463D', '#ECE8E0'],
  needs: ['#9A5B00', '#FCF0DA'],
};

export const FAQ: [string, string][] = [
  ['Does the AI send messages without me?', 'Only if you want it to. In Shadow mode every reply is a draft you approve. You can switch to full replies per channel when you trust it.'],
  ['Which channels does it work with?', 'WhatsApp Business, email and SMS. You can connect more than one email inbox, and each channel keeps its own colour in the app.'],
  ['Can I change the stages?', 'Yes. Your industry sets sensible stages to start with, and you can rename, reorder or remove any of them in Settings.'],
  ['How do I bring in my existing contacts?', 'Upload a CSV file from your current system or phone. We match the columns and show you a preview before anything is imported.'],
  ['What happens if a Direct Debit payment fails?', 'We tell you straight away and retry. Your account stays open while you update your details, and we show the timeline before anything changes.'],
];
