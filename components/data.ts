export type ChannelKey = 'wa' | 'email' | 'fb' | 'ig' | 'li';

export const CH: Record<ChannelKey, { l: string; c: string; t: string }> = {
  wa: { l: 'WhatsApp', c: '#0F7A45', t: '#E3F4EA' },
  email: { l: 'Email', c: '#2457C5', t: '#E7EEFB' },
  fb: { l: 'Facebook', c: '#1877F2', t: '#E3EEFE' },
  ig: { l: 'Instagram', c: '#C2185B', t: '#FCE7F0' },
  li: { l: 'LinkedIn', c: '#B4540A', t: '#FBEBDD' },
};

export const CH_ORDER: ChannelKey[] = ['wa', 'email', 'fb', 'ig', 'li'];

export const CHANNEL_INFO: Record<ChannelKey, { d: string; long: string }> = {
  wa: { d: 'Connect more than one WhatsApp number. Photos and documents land in the same thread as the reply.', long: 'Most customers already live on WhatsApp. Connect every business number you use and each conversation is collected in its own WhatsApp folder, with a drafted reply waiting. Photos, voice notes and documents stay in the same thread as the answer.' },
  email: { d: 'Connect Gmail, Outlook, Hotmail and more in one place. Complaints and quote requests are picked out first.', long: 'Add as many inboxes as your business uses: Gmail, Outlook, Hotmail, Sky or your own domain. Complaints and quote requests are picked out and handled first, and replies go out from the address the customer wrote to.' },
  fb: { d: 'Messages from your Facebook business page go into their own folder with a reply ready to approve.', long: 'Questions sent to your Facebook business page are collected into a Facebook folder alongside everything else. Each one is sorted, drafted and prioritised, so a message sent at midnight is not found three days later.' },
  ig: { d: 'Instagram direct messages are collected with the rest, so no enquiry sits unseen in an app you rarely open.', long: 'Instagram enquiries are easy to miss. Direct messages are collected into an Instagram folder, drafted in your voice and prioritised, so a customer who messages after seeing a post still gets an answer on time.' },
  li: { d: 'LinkedIn messages from prospects and partners are not ignored. They are sorted and drafted like the rest.', long: 'Prospects, partners and recruiters message businesses on LinkedIn and often wait weeks for a reply. Those conversations are collected into a LinkedIn folder, drafted and prioritised so a good opportunity is never ignored.' },
};

export type Industry = {
  name: string; slug: string; ch: ChannelKey; who: string; ask: string; reply: string; stages: string[];
  photo: 'builder' | 'plumber' | 'salon' | 'dental' | 'realEstate' | 'legal' | 'restaurant' | 'garage' | 'tutor' | 'fitness';
  h1: string; intro: string; pains: string[]; helps: string[]; desc: string;
};

const IND_DATA: Industry[] = [
  { name: 'Construction and trades', slug: 'construction-and-trades', ch: 'wa', who: 'Sarah, Leeds', ask: 'Can you quote for a rear extension, about 4m by 5m?', reply: 'Thanks Sarah. We offer a free site visit first. Would Thursday at 10:00 or Friday at 14:00 suit you?', stages: ['New', 'Qualified', 'Site visit', 'Quoted', 'Won', 'Lost'], photo: 'builder',
    h1: 'AI front desk for construction and trades', desc: 'Answer quote requests the moment they arrive, book site visits and chase every quote while your team is on site.',
    intro: 'Quote requests arrive at all hours, usually while the team is on site and the phone is in a pocket. 24x7 Automation collects every enquiry from every channel, drafts a reply and offers the site visit, so the job does not go to whoever answered first.',
    pains: ['Enquiries land after hours while the team is on site', 'Quote requests are scattered across WhatsApp, email and social messages', 'Sent quotes are not chased and good jobs go cold'],
    helps: ['Replies are drafted straight away and a site visit is offered from your diary', 'Each request is filed under Qualified with the job details captured', 'Quotes are chased on schedule in your own wording'] },
  { name: 'Home services', slug: 'home-services', ch: 'wa', who: 'Priya, Salford', ask: 'Boiler is making a banging noise. Can someone come today?', reply: 'Sorry to hear that, Priya. We have an engineer free at 15:00 today. Our callout fee is £65 and covers the first hour.', stages: ['New', 'Qualified', 'Booked', 'Job done', 'Invoiced', 'Lost'], photo: 'plumber',
    h1: 'AI front desk for plumbers, heating and home services', desc: 'Handle urgent callouts, fee questions and complaints calmly, with every reply backed by your own terms.',
    intro: 'Home service customers want an answer now, and they message several firms at once. 24x7 Automation replies in minutes, explains your callout fees from your own terms and hands the job to the right engineer.',
    pains: ['Urgent callouts arrive while engineers are under a sink', 'Disputes over callout fees take hours of back and forth', 'Jobs get passed to engineers by phone and forgotten'],
    helps: ['An engineer slot is offered immediately and the booking is recorded', 'Complaint replies are drafted from your terms with the clause shown', 'Jobs are delegated to the right person and the customer is told'] },
  { name: 'Clinics and dental', slug: 'clinics-and-dental', ch: 'wa', who: 'Patient, Bristol', ask: 'Do you have a hygienist appointment this week?', reply: 'We have Wednesday at 09:15 or Friday at 10:30. Reply 1 or 2 and we will book it.', stages: ['New', 'Triage', 'Booked', 'Attended', 'Recall', 'Lost'], photo: 'dental',
    h1: 'AI front desk for clinics and dental practices', desc: 'Offer open appointment slots by message, handle rebookings and recalls and keep reception free for patients in the room.',
    intro: 'Phone tag over diary changes keeps reception busy and patients waiting. 24x7 Automation answers appointment questions on WhatsApp, email and social media, offers open slots and sends recall reminders.',
    pains: ['Reception answers the phone all day for diary changes', 'Patients message outside opening hours and wait until morning', 'Recall reminders are sent inconsistently'],
    helps: ['Open slots are offered and rebookings are handled without staff', 'Out of hours messages are collected, drafted and ready for the morning', 'Recalls are sent on schedule from the same number every time'] },
  { name: 'Salons and beauty', slug: 'salons-and-beauty', ch: 'wa', who: 'Chloe, Brighton', ask: 'How much for a full head of highlights?', reply: 'From £95 depending on length. A quick consultation first is free. Would Saturday at 11:00 work?', stages: ['New', 'Consultation', 'Booked', 'Visited', 'Rebook', 'Lost'], photo: 'salon',
    h1: 'AI front desk for salons and beauty businesses', desc: 'Reply to price and booking messages on WhatsApp and Instagram while your hands are busy with a client.',
    intro: 'Salon enquiries arrive on WhatsApp and Instagram while you have a client in the chair. 24x7 Automation answers price and availability questions in your voice and books the consultation.',
    pains: ['Messages pile up on WhatsApp and Instagram during appointments', 'Price questions get answered hours later, after the client booked elsewhere', 'Regular clients are not nudged to rebook'],
    helps: ['Price and availability replies are drafted instantly', 'Instagram and WhatsApp messages sit in their own folders, ready for you', 'Rebooking prompts go out on schedule after each visit'] },
  { name: 'Real estate', slug: 'real-estate', ch: 'email', who: 'Daniel, Reading', ask: 'Is the 3 bed on Elm Road still available to view?', reply: 'Yes, it is. Viewings are open Tuesday and Thursday evenings. Shall I book you in for Tuesday at 18:00?', stages: ['New', 'Qualified', 'Viewing', 'Offer', 'Agreed', 'Lost'], photo: 'realEstate',
    h1: 'AI front desk for estate and letting agents', desc: 'Respond to viewing requests from every portal and channel, qualify buyers and keep every lead warm.',
    intro: 'Buyers and tenants enquire on portals, email, WhatsApp and social media, and move on quickly if nobody answers. 24x7 Automation replies fast, offers viewing slots and keeps every lead in one dashboard.',
    pains: ['Portal, email and social enquiries arrive in different places', 'Viewing requests wait until an agent is free', 'Warm leads are forgotten after the first viewing'],
    helps: ['Every enquiry is collected by channel and answered with viewing slots', 'Buyers are qualified and moved through viewing, offer and agreed stages', 'Follow ups after viewings are sent on schedule'] },
  { name: 'Legal and accounting', slug: 'legal-and-accounting', ch: 'email', who: 'Helen, Cardiff', ask: 'I need help with my self assessment this year.', reply: 'Happy to help, Helen. Our fixed fee starts at £250. I can arrange a 15 minute call to check what you need.', stages: ['New', 'Checks', 'Consultation', 'Engaged', 'Closed', 'Lost'], photo: 'legal',
    h1: 'AI front desk for law and accounting firms', desc: 'Answer new client enquiries promptly, run initial checks and book consultations without interrupting billable work.',
    intro: 'New client enquiries compete with billable work. 24x7 Automation answers first questions, shares your fixed fees from your own terms and books the consultation, while you approve anything sensitive before it is sent.',
    pains: ['Enquiries interrupt billable work', 'First replies are slow, so prospects contact another firm', 'Fee and scope questions are answered inconsistently'],
    helps: ['First replies are drafted from your published fees and terms', 'Initial checks and consultation bookings are tracked as stages', 'Shadow mode means nothing is sent until you approve it'] },
  { name: 'Restaurants and hospitality', slug: 'restaurants-and-hospitality', ch: 'wa', who: 'Ravi, Birmingham', ask: 'Table for 14 on Saturday the 17th?', reply: 'We can seat 14 at 19:30. Groups over 10 need a £10 per head deposit. Shall I hold it for you?', stages: ['New', 'Enquiry', 'Held', 'Confirmed', 'Seated', 'Lost'], photo: 'restaurant',
    h1: 'AI front desk for restaurants and hospitality', desc: 'Handle group bookings, deposits and event enquiries across WhatsApp, email and social media during service.',
    intro: 'Group bookings and event enquiries come in during the busiest hours of service. 24x7 Automation answers with availability and deposit terms, holds the table and confirms the booking.',
    pains: ['Booking messages arrive mid service', 'Group and event enquiries need deposit and menu details', 'Social media messages are checked only occasionally'],
    helps: ['Availability and deposit terms are replied to instantly', 'Tables are held and confirmed as stages', 'Instagram and Facebook enquiries are collected with the rest'] },
  { name: 'Automotive and garages', slug: 'automotive-and-garages', ch: 'wa', who: 'Gary, Norwich', ask: 'Need an MOT and a look at my brakes.', reply: 'We can do both on Monday. MOT is £54.85, brake check is free with it. Drop off by 08:30.', stages: ['New', 'Diagnosed', 'Quoted', 'Booked in', 'Collected', 'Lost'], photo: 'garage',
    h1: 'AI front desk for garages and automotive businesses', desc: 'Quote, book and remind customers by message while your mechanics stay under the bonnet.',
    intro: 'Mechanics cannot answer messages with their hands inside an engine. 24x7 Automation quotes standard jobs, books the car in and sends reminders on WhatsApp.',
    pains: ['Calls and messages are missed while the team is working', 'Customers ask the same pricing questions every day', 'MOT and service reminders are sent late or not at all'],
    helps: ['Standard jobs are quoted from your price list and booked in', 'Repeat questions are answered from your own information', 'Reminders go out on WhatsApp from the same number every time'] },
  { name: 'Education and tutoring', slug: 'education-and-tutoring', ch: 'email', who: 'Parent, Oxford', ask: 'Do you offer GCSE maths tutoring online?', reply: 'Yes, online and in person. The first lesson is a trial at half price. Which evenings suit your child?', stages: ['New', 'Assessment', 'Trial lesson', 'Enrolled', 'Renewed', 'Lost'], photo: 'tutor',
    h1: 'AI front desk for tutors and education businesses', desc: 'Respond to parent and student enquiries, book trial lessons and manage renewals without evening admin.',
    intro: 'Parents enquire in the evening and expect a quick answer. 24x7 Automation replies with your subjects, prices and trial offer, books the first lesson and prompts renewals.',
    pains: ['Evening enquiries wait until the next teaching break', 'Trial lessons are arranged through long email threads', 'Renewals depend on someone remembering to ask'],
    helps: ['Subject, price and trial replies are drafted instantly', 'Trial lessons are booked and tracked as stages', 'Renewal prompts are sent on schedule'] },
  { name: 'Fitness studios', slug: 'fitness-studios', ch: 'wa', who: 'Aisha, Glasgow', ask: 'Can I try a class before joining?', reply: 'Of course. Your first class is free. There is space at Tuesday 18:30 reformer or Thursday 07:00 HIIT.', stages: ['New', 'Trial booked', 'Trial attended', 'Member', 'Renewed', 'Lost'], photo: 'fitness',
    h1: 'AI front desk for fitness studios and gyms', desc: 'Turn trial class enquiries from Instagram, WhatsApp and email into booked sessions and renewed members.',
    intro: 'Most new members first message the studio on Instagram or WhatsApp. 24x7 Automation answers with class times and your trial offer, books the session and follows up after the first class.',
    pains: ['Trial enquiries arrive on Instagram and WhatsApp at all hours', 'Coaches cannot reply while teaching', 'Trial attendees are not followed up'],
    helps: ['Class times and trial offers are replied to instantly', 'Trials are booked and tracked from enquiry to member', 'Follow ups after the first class are sent automatically'] },
];

/** Display order. Construction deliberately comes last so the first impression is not "only for builders". */
const IND_ORDER = ['salons-and-beauty', 'real-estate', 'legal-and-accounting', 'restaurants-and-hospitality', 'education-and-tutoring', 'fitness-studios', 'clinics-and-dental', 'automotive-and-garages', 'home-services', 'construction-and-trades'];
export const IND: Industry[] = IND_ORDER.map((slug) => IND_DATA.find((x) => x.slug === slug)!);

export const industryBySlug = (slug: string) => IND.find((x) => x.slug === slug);

/** The channels each industry's customers use most, shown on its page. */
export const INDUSTRY_CHANNELS: Record<string, ChannelKey[]> = {
  'construction-and-trades': ['wa', 'email', 'fb', 'li'],
  'home-services': ['wa', 'email', 'fb'],
  'clinics-and-dental': ['wa', 'email', 'fb'],
  'salons-and-beauty': ['wa', 'ig', 'fb'],
  'real-estate': ['email', 'wa', 'fb', 'ig', 'li'],
  'legal-and-accounting': ['email', 'li', 'wa'],
  'restaurants-and-hospitality': ['wa', 'ig', 'fb', 'email'],
  'automotive-and-garages': ['wa', 'fb', 'email'],
  'education-and-tutoring': ['email', 'wa', 'fb'],
  'fitness-studios': ['wa', 'ig', 'fb', 'email'],
};

/** Industries served by the custom automation service (the ERP-style demos discussed with Saquib). */
export const CUSTOM_INDUSTRIES = [
  { name: 'Distributors and FMCG', d: 'Order flow, stock, distributor follow ups and returns in one place.' },
  { name: 'Importers and international traders', d: 'Shipments, landed cost, supplier payments and margin tracking.' },
  { name: 'Wholesalers', d: 'Quotes, repeat orders, credit limits and delivery scheduling.' },
  { name: 'Retailers', d: 'Stock levels, reordering, supplier chasing and daily sales reports.' },
  { name: 'Agencies', d: 'Client requests, approvals, project status and invoicing without chasing.' },
  { name: 'Small manufacturers', d: 'Production planning, raw materials, work orders and dispatch.' },
  { name: 'Auto part manufacturers', d: 'Order books, batch tracking, quality checks and dealer follow ups.' },
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
  { title: 'Every channel, one dashboard', desc: 'Instagram, Facebook and LinkedIn messages are sorted and drafted too.', who: 'Lena Fox', ch: 'ig', msgs: [
    { f: 'c', t: 'Hi, do you have any Saturday slots left?' },
    { f: 's', t: 'Filed under Instagram · drafted · no phone alert' },
    { f: 'ai', t: 'Hi Lena, yes we have 10:00 and 14:30 on Saturday. Which suits you?' },
    { f: 'c', t: '14:30 please.' },
    { f: 's', t: 'Stage moved from New to Booked' }] },
  { title: 'Delegate to your team', desc: 'Hands the job to the right person and tells the customer.', who: 'Priya Shah', ch: 'wa', msgs: [
    { f: 'c', t: 'The tap you fitted last week is dripping again.' },
    { f: 'ai', t: 'Sorry about that, Priya. I have passed this to Dan, who fitted it. He will message you today to arrange a time.' },
    { f: 's', t: 'Delegated to Dan · due today' }] },
  { title: 'Follow ups that happen', desc: 'Quotes are chased on schedule, in your wording.', who: 'Jo Evans', ch: 'wa', msgs: [
    { f: 's', t: 'Quote sent 5 days ago · no reply' },
    { f: 'ai', t: 'Hi Jo, just checking you received our quote for the bathroom refit. Happy to answer any questions.' },
    { f: 'c', t: 'Yes thanks. Can we start in November?' },
    { f: 's', t: 'Stage moved from Quoted to Won' }] },
  { title: 'Save edits as templates', desc: 'Edit a draft once and reuse it next time.', who: 'Amy Clarke', ch: 'wa', msgs: [
    { f: 'c', t: 'Can I move my appointment to Friday?' },
    { f: 'ai', t: 'Of course. We have Friday at 10:30 or 15:15. Parking is free behind the building.' },
    { f: 's', t: 'You edited the draft · saved as template Rebooking' },
    { f: 'c', t: '10:30 please.' }] },
];

export type HeroItem = { ch: ChannelKey; who: string; txt: string; t: string; o: 'ai' | 'won' | 'del' | 'needs'; ol: string };

export const HERO: HeroItem[] = [
  { ch: 'wa', who: 'Sarah Hughes', txt: 'Can you quote for a rear extension?', t: '23:41', o: 'ai', ol: 'Reply drafted' },
  { ch: 'email', who: 'Mark Patel', txt: 'Why was I charged a callout fee?', t: '00:17', o: 'ai', ol: 'Clause 4.2 cited' },
  { ch: 'li', who: 'Anita Rao', txt: 'Interested in a partnership call', t: '01:05', o: 'needs', ol: 'Needs you' },
  { ch: 'email', who: 'Jo Evans', txt: 'Can we start in November?', t: '01:52', o: 'won', ol: 'Moved to Won' },
  { ch: 'ig', who: 'Lena Fox', txt: 'Any Saturday slots left?', t: '02:30', o: 'ai', ol: 'Reply drafted' },
  { ch: 'wa', who: 'Priya Shah', txt: 'The tap is dripping again', t: '03:08', o: 'del', ol: 'Delegated to Dan' },
  { ch: 'fb', who: 'Omar Khan', txt: 'Are you open on Sundays?', t: '05:12', o: 'ai', ol: 'Reply drafted' },
  { ch: 'email', who: 'Tom Reid', txt: 'Can you match a lower quote?', t: '06:30', o: 'needs', ol: 'Needs you' },
];

export const OUT: Record<HeroItem['o'], [string, string]> = {
  ai: ['#0B7282', '#E2F2F4'],
  won: ['#3B6E2A', '#EAF2E4'],
  del: ['#4B463D', '#ECE8E0'],
  needs: ['#9A5B00', '#FCF0DA'],
};

export const FAQ: [string, string][] = [
  ['What is 24x7 Automation?', '24x7 Automation is an AI front desk. It brings your emails, WhatsApp, Facebook, Instagram and LinkedIn conversations into one unified dashboard, sorts each one into its own folder, drafts replies in your voice and prioritises what needs a response, so you only step in when a decision needs you.'],
  ['Does the AI send messages without me?', 'Only if you want it to. In Shadow mode every reply is a draft you approve. You can switch to full replies per channel when you trust it, and one switch pauses the AI across every channel.'],
  ['Which channels does it work with?', 'WhatsApp Business, email, Facebook, Instagram and LinkedIn. Each channel keeps its own colour and its own folder in the dashboard, so you always know where a customer wrote from.'],
  ['Can I connect more than one account per channel?', 'Yes. Connect several email addresses (Gmail, Outlook, Hotmail and others), and several WhatsApp numbers, all in one place. Multiple accounts are included in tailored plans.'],
  ['Will my phone still ping all day?', 'No. Messages are collected and managed in the right folder instead of arriving as a stream of notifications. When you open the dashboard you see what needs a response now, and the rest is already drafted or handled.'],
  ['How does the dashboard work?', 'The dashboard shows one day at a time. Every conversation has a toolbar with Done, Delegate, Follow up and Remind me, and each action is recorded on the day you took it, so you can see exactly what is left.'],
  ['How does it handle complaints?', 'Complaints are flagged and drafted for your approval, never sent on their own. The draft is built from your own terms and documents and shows the clause it used, so the reply is specific rather than generic.'],
  ['Can I change the stages?', 'Yes. Your industry sets sensible stages to start with, and you can rename, reorder or remove any of them in Settings.'],
  ['How do I bring in my existing contacts?', 'Upload a CSV file from your current system or phone. We match the columns and show you a preview before anything is imported.'],
  ['Is there a free trial?', 'Yes. Every business starts with a two week trial. If you decide to continue, we take one annual payment. There are no monthly payments to track.'],
  ['How much does it cost?', 'Pricing is tailored to your business, based on the channels you use, the volume of conversations and your team size. You get one fixed price, so you always know what you will pay. Book a demo and we will quote you.'],
  ['Which industries is it built for?', 'Any business that answers customers by message: construction and trades, home services, clinics and dental, salons, real estate, legal and accounting, hospitality, garages, education and fitness, and many more. Pick your industry and the stages and wording match it.'],
  ['Can you build automation around my own processes?', 'Yes. Tell us where your business is slowed down and we design a solution around it. You approve the solution and the price before we build anything. See our custom automation page for how it works.'],
  ['Can 24x7 Automation read my emails or WhatsApp messages?', 'No. We connect your domains and platforms to our system, but we do not have access to see your emails, WhatsApps or social messages. Your conversations are end-to-end encrypted, so they stay private to you.'],
  ['How is my data stored and protected?', 'Your conversations are end-to-end encrypted. The access you grant to a channel, such as your email connection, is kept in an encrypted vault and never in plain text. You can disconnect any channel at any time, and every action is recorded in an audit log by day. We explain how data is stored in plain language on our security page.'],
  ['How do I get started?', 'Book a demo. We set it up with your industry stages and a few of your real questions, so you see replies in your own words. You then start your two week trial.'],
];

export const FAQ_PRICING = [FAQ[9], FAQ[10], FAQ[3], FAQ[1]];
export const FAQ_HOME = [FAQ[0], FAQ[1], FAQ[13], FAQ[4], FAQ[9], FAQ[10], FAQ[12]];

export const COUNTRIES = ['United Kingdom', 'United States', 'Pakistan', 'United Arab Emirates', 'Saudi Arabia', 'Canada', 'Australia', 'Ireland', 'India', 'Bangladesh', 'Qatar', 'Kuwait', 'Oman', 'Bahrain', 'Turkey', 'Egypt', 'South Africa', 'Nigeria', 'Kenya', 'Ghana', 'Germany', 'France', 'Spain', 'Italy', 'Netherlands', 'Belgium', 'Sweden', 'Norway', 'Denmark', 'Poland', 'Portugal', 'Switzerland', 'Singapore', 'Malaysia', 'Indonesia', 'Philippines', 'Hong Kong', 'China', 'Japan', 'South Korea', 'New Zealand', 'Brazil', 'Mexico', 'Argentina', 'Other'];
