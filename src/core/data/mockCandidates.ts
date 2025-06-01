import {CandidateApiData} from "@/core/types/Election";

export const mockCandidates: CandidateApiData[] = [
	{
		id: 'cand1',
		positionId: 'pos1',
		electionId: 'election1',
		profile: {
			name: 'John Adebayo',
			bio: "Born and raised in Lagos, I discovered my passion for technology at age 12 when I built my first website. Since joining the university, I've organized 5 successful tech events, mentored over 50 students, and secured sponsorships worth ₦2 million for student activities. I believe in servant leadership and putting students first.",
			imageUrl: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
			bannerUrl: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
		},
		academic: {
			level: 400,
			department: 'Computer Science',
			cgpa: 'First class'
		},
		campaign: {
			profile: "I am a dedicated student leader with 3 years of experience in various student organizations. Former Google Developer Student Club Lead, Microsoft Learn Student Ambassador, and current class representative. My passion lies in bridging the gap between students and administration while fostering technological innovation.",
			key_promises: [
				"24/7 computer lab access with modern equipment",
				"Monthly tech workshops and bootcamps",
				"Industry partnerships for guaranteed internships",
				"Student innovation fund of ₦500,000",
				"Improved Wi-Fi connectivity across all campus areas",
				"Weekly office hours for student concerns"
			],
		},
		manifesto: `Dear Fellow Students,\n\nI am John Adebayo, a final year Computer Science student, and I am running for President of our beloved association. Over the past three years, I have witnessed the challenges we face as tech students in this digital age.\n\nMy vision is to transform our association into a hub of innovation and excellence. I pledge to:\n\n1. IMPROVE TECHNOLOGICAL INFRASTRUCTURE\n- Advocate for 24/7 access to computer labs with updated software\n- Negotiate with the administration for better Wi-Fi coverage across campus\n- Establish a student-run tech support center\n\n2. ENHANCE PRACTICAL LEARNING\n- Organize monthly workshops on emerging technologies (AI, Blockchain, Cloud Computing)\n- Partner with tech companies for hands-on training sessions\n- Create a peer-to-peer learning program where senior students mentor juniors\n\n3. BRIDGE THE INDUSTRY GAP\n- Establish partnerships with at least 10 tech companies for internship opportunities\n- Host quarterly tech career fairs\n- Create an alumni mentorship network\n\n4. FOSTER INNOVATION\n- Launch a monthly hackathon series with prizes\n- Establish an innovation fund to support student tech projects\n- Create a showcase platform for student innovations\n\nTogether, we can build a stronger, more connected tech community. Your vote is not just for me, but for the future we'll create together.\n\nVote John Adebayo for President - Let's Code Our Future!`,
		votes: 245,
		achievements: [
			'Multiple students innovations and scholarships'
		]
	},
	{
		id: 'cand2',
		positionId: 'pos1',
		electionId: 'election1',
		profile: {
			name: 'Mary Johnson',
			bio: "From Abuja, started coding at 14. I've interned at Microsoft and Andela, and I'm passionate about creating opportunities for others. I've organized 10+ tech events and helped 50+ students land their first tech roles. I believe leadership is about service, not status.",
			imageUrl: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
			bannerUrl: ''
		},
		academic: {
			level: 300,
			department: 'Software Engineering',
			cgpa: ''
		},
		campaign: {
			profile: "Current VP of Academic Affairs, Google Women Techmakers Scholar, GitHub Campus Expert. I've spent the last two years fighting for student rights and securing resources for our association. My leadership style is inclusive, transparent, and results-driven.",
			key_promises: [
				"20+ company partnerships for guaranteed internships",
				"Free access to Coursera, Udemy, and Pluralsight",
				"Monthly ₦50,000 grants for student projects",
				"Mental health support programs",
				"Weekend bootcamps with industry experts",
				"Transparent monthly financial reports"
			]
		},
		votes: 232,
		manifesto: `My Fellow Tech Warriors,\n\nI'm Mary Johnson, running for President because I believe it's time for transformative change in our association. As a Software Engineering student who has faced the same struggles you have, I understand what needs to be done.\n\nMY TRACK RECORD:\n- Led the organization of TechFest 2023 with 500+ attendees\n- Secured internship opportunities for 30 students last semester\n- Founded the Women in Tech support group\n\nMY AGENDA - "PROJECT ELEVATE":\n\n1. ACADEMIC EXCELLENCE INITIATIVE\n- Establish a comprehensive past questions and resources database\n- Create study groups for every course with qualified tutors\n- Negotiate for more practical-oriented curriculum with the department\n\n2. CAREER DEVELOPMENT PROGRAM\n- Mandatory career counseling for all levels\n- Industry mentorship matching program\n- CV review and interview preparation workshops\n- Partnership with 20+ tech companies for internships\n\n3. INCLUSIVE TECH COMMUNITY\n- Support groups for underrepresented students\n- Skill-sharing sessions every weekend\n- Mental health support programs\n- Financial aid for certification exams\n\n4. INFRASTRUCTURE REVOLUTION\n- 24-hour study spaces with reliable power\n- Modern computer lab with latest software\n- Student tech hub with 3D printers and IoT devices\n- Free access to premium learning platforms\n\n5. TRANSPARENCY & ACCOUNTABILITY\n- Monthly town halls\n- Public financial reports\n- Student feedback portal\n- Performance tracking dashboard\n\nI don't just make promises - I deliver results. Check my track record.\n\nVote Mary Johnson - Experience. Vision. Action.`,
	},
	{
		id: 'cand3',
		positionId: 'pos2',
		electionId: 'election1',
		profile: {
			name: 'David Okonkwo',
			bio: "From Enugu State, I understand the struggles of being far from home. I've been advocating for student rights since my first year. My philosophy: 'No student left behind.' I've helped over 100 students resolve academic and personal challenges.",
			imageUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
			bannerUrl: ''
		},
		academic: {
			level: 300,
			department: 'Computer Science',
			cgpa: ''
		},
		campaign: {
			profile: "Two-time class representative, current Welfare Director, and student rights advocate. I've successfully mediated numerous student-faculty disputes and improved learning conditions for hundreds of students. My approach is diplomatic yet firm when defending student interests.",
			key_promises: [
				"24-hour response time for student complaints",
				"Monthly town halls with administration",
				"Emergency fund for students in crisis",
				"Improved course feedback system",
				"Regular welfare checks for all students",
				"Transparent communication channels"
			]
		},
		votes: 189,
		manifesto: `Distinguished Students,\n\nAs your potential Vice President, I, David Okonkwo, present my vision for a more connected and empowered student body.\n\nTHE CHALLENGE:\nWe face a disconnect between student needs and administrative decisions. Our voices are often unheard, our concerns dismissed, and our potential untapped.\n\nMY SOLUTION - "OPERATION BRIDGE":\n\n1. ENHANCED COMMUNICATION CHANNELS\n- Weekly meetings with department heads\n- Student concern rapid response team (24-hour response time)\n- Anonymous feedback system for sensitive issues\n- Regular surveys to track student satisfaction\n\n2. ACADEMIC SUPPORT STRUCTURE\n- Peer tutoring program with incentives\n- Course material repository\n- Assignment help desks\n- Exam preparation bootcamps\n\n3. WELFARE INITIATIVES\n- Emergency student fund for those in need\n- Health insurance advocacy\n- Improved hostel conditions campaign\n- Transportation subsidy negotiations\n\n4. SKILL DEVELOPMENT\n- Soft skills training workshops\n- Leadership development programs\n- Public speaking clubs\n- Project management certification support\n\nI bring experience as Class Governor and Welfare Director. I've successfully resolved 15 student-faculty conflicts and improved course delivery in 3 subjects through constructive dialogue.\n\nYour voice matters. Let me be your megaphone.\n\nVote David Okonkwo for VP - Building Bridges, Not Walls!`,
	},
	{
		id: 'cand4',
		positionId: 'pos2',
		electionId: 'election1',
		profile: {
			name: 'Sarah Ahmed',
			bio: "Born in Kano, raised in Abuja. Started my first tech business at 17...",
			imageUrl: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
			bannerUrl: ''
		},
		academic: {
			level: 400,
			department: 'Information Systems',
			cgpa: ''
		},
		campaign: {
			profile: "LinkedIn Campus Editor, Career Services Volunteer, Intel Student Ambassador...",
			key_promises: [
				"100% internship placement for 300-400 level students",
				"Monthly career fairs with hiring companies",
				"Free resume review services",
				"Mock interview sessions every week",
				"₦1M entrepreneurship fund",
				"International opportunity exposure"
			]
		},
		votes: 216,
		manifesto: `Dear Tech Family,\n\nI am Sarah Ahmed...`,
	},
	{
		id: 'cand5',
		positionId: 'pos3',
		electionId: 'election1',
		profile: {
			name: 'Michael Chukwu',
			bio: "From Owerri, I grew up surrounded by bureaucracy and decided to fight it with technology...",
			imageUrl: 'https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
			bannerUrl: ''
		},
		academic: {
			level: 300,
			department: 'Computer Science',
			cgpa: ''
		},
		campaign: {
			profile: "Tech blogger, Digital transformation advocate, Current Assistant Secretary...",
			key_promises: [
				"Mobile app launch within first month",
				"24-hour document request fulfillment",
				"Weekly communication updates",
				"Paperless administration by month 3",
				"Live-streamed meetings",
				"Digital archive access for all members"
			]
		},
		votes: 198,
		manifesto: `Esteemed Members,\n\nI'm Michael Chukwu...`,
	},
	{
		id: 'cand6',
		positionId: 'pos3',
		electionId: 'election1',
		profile: {
			name: 'Jennifer Nwosu',
			bio: "From Port Harcourt, I learned early that information is power, but only when it's accessible...",
			imageUrl: 'https://images.pexels.com/photos/3775131/pexels-photo-3775131.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
			bannerUrl: ''
		},
		academic: {
			level: 300,
			department: 'Information Technology',
			cgpa: ''
		},
		campaign: {
			profile: "Communications specialist, Former PRO, Microsoft Office Specialist certified...",
			key_promises: [
				"Website relaunch in 30 days",
				"Weekly newsletter without fail",
				"Response time under 6 hours",
				"Digital certificate system",
				"Member achievement spotlight program",
				"Comprehensive activity reports"
			]
		},
		votes: 175,
		manifesto: `Respected Colleagues,\n\nI'm Jennifer Nwosu...`,
	},
	{
		id: 'cand7',
		positionId: 'pos4',
		electionId: 'election2',
		profile: {
			name: 'Emmanuel Okafor',
			bio: "From Onitsha, where every naira counts. My merchant father taught me that trust is earned through transparency. I've helped 5 organizations optimize their finances, increasing their budgets by an average of 40%. Let me do the same for us.",
			imageUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
			bannerUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=940',
		},
		academic: {
			level: 400,
			department: 'Computer Science',
			cgpa: 'First Class'
		},
		campaign: {
			profile: "Certified Financial Analyst in training, Former Finance Committee Chair, Blockchain enthusiast. I've managed budgets exceeding ₦10M with zero discrepancies. I believe in radical transparency and innovative financial management.",
			key_promises: [
				"Real-time financial dashboard launch",
				"Monthly transparent reports",
				"30% budget increase through sponsorships",
				"Emergency fund of ₦500,000",
				"Investment returns of 15% minimum",
				"Zero corruption tolerance"
			],
		},
		manifesto: `Fellow Students,\n\nI'm Emmanuel Okafor, running for Treasurer. Money matters, especially when it's yours. I promise to guard every kobo like it's my last.\n\nTHE FINANCIAL REALITY:\n- Unclear budget allocations\n- No financial reports for 2 years\n- Missing receipts and records\n- Zero investment strategies\n- No emergency funds\n\nMY FINANCIAL REVOLUTION PLAN:\n\n1. TRANSPARENCY FIRST\n- Real-time financial dashboard\n- Monthly detailed reports\n- Expense tracking app\n- Public budget meetings\n- Quarterly audits\n\n2. REVENUE GENERATION\n- Corporate sponsorship drive\n- Paid skill workshops\n- Association merchandise\n- Investment portfolio\n- Grant applications\n\n3. SMART SPENDING\n- Zero-based budgeting\n- Vendor negotiations\n- Bulk purchase savings\n- Digital payment systems\n- Expense approval workflow\n\n4. MEMBER BENEFITS\n- Student emergency fund\n- Project funding grants\n- Scholarship endowment\n- Subsidized training\n- Financial literacy workshops\n\n5. FINANCIAL SECURITY\n- Multiple bank accounts\n- Insurance policies\n- Investment committee\n- Risk management\n- Reserve fund (20% minimum)\n\nMY QUALIFICATIONS:\n- ICAN Student Member\n- Managed ₦5M budget for Tech Week\n- 4.8 GPA in Financial Management\n- Internship at PwC\n- Zero discrepancies in all my accounts\n\nYour money deserves better. I'm the upgrade you need.\n\nVote Emmanuel Okafor - Financial Excellence Guaranteed!`,
		votes: 203,
	},
	{
		id: 'cand8',
		positionId: 'pos4',
		electionId: 'election2',
		profile: {
			name: 'Fatima Ibrahim',
			bio: "From Kaduna, where I started my first business at 15 with ₦5,000. Now running a six-figure startup. I understand money's power to transform lives and I'm ready to multiply our association's impact.",
			imageUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
			bannerUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=20&w=940',
		},
		academic: {
			level: 300,
			department: 'Software Engineering',
			cgpa: 'First Class'
		},
		campaign: {
			profile: "FinTech enthusiast, Startup founder, Investment club president. I've grown every budget I've managed by at least 50%. My approach combines traditional financial wisdom with innovative fintech solutions.",
			key_promises: [
				"10X budget growth in one year",
				"₦50,000 grants for student startups",
				"Cryptocurrency investment portfolio",
				"Zero-interest emergency loans",
				"Monthly financial literacy workshops",
				"Transparent blockchain records"
			],
		},
		manifesto: `Dear Association Members,\n\nI'm Fatima Ibrahim, and I want to be your Treasurer because I believe our association's financial potential remains largely untapped.\n\nTHE OPPORTUNITY:\nWe operate on a ₦2M annual budget when we could easily manage ₦10M with proper strategies.\n\nMY GROWTH STRATEGY - "PROJECT 10X":\n\n1. DIVERSIFIED REVENUE STREAMS\n- Tech consulting services\n- Coding bootcamp franchise\n- Annual tech conference\n- Online course sales\n- Equipment rental service\n- Alumni donation drive\n\n2. FINANCIAL INNOVATION\n- Cryptocurrency investment\n- Peer-to-peer lending\n- Crowdfunding campaigns\n- NFT project launch\n- Stock market investment\n- Fixed deposit optimization\n\n3. COST OPTIMIZATION\n- Automated expense tracking\n- Vendor partnership deals\n- Energy cost reduction\n- Digital-first approach\n- Shared resource programs\n- Waste elimination audit\n\n4. MEMBER EMPOWERMENT\n- ₦50,000 startup grants\n- Interest-free student loans\n- Financial planning sessions\n- Investment club creation\n- Savings challenge program\n- Entrepreneurship bootcamp\n\n5. ACCOUNTABILITY MEASURES\n- Blockchain transaction records\n- Public expenditure voting\n- External audit quarterly\n- Whistleblower protection\n- Performance bonuses\n- Impact measurement\n\nCREDENTIALS:\n- Raised ₦3M for charity in 6 months\n- Trading profit of 200% last year\n- Financial blogger with 10K readers\n- Quickbooks certified\n- Zero tolerance for waste\n\nThink big. Vote bigger.\n\nFatima Ibrahim - Your Financial Growth Partner!`,
		votes: 187,
	},
	{
		id: 'cand9',
		positionId: 'pos5',
		electionId: 'election2',
		profile: {
			name: 'Daniel Adegoke',
			bio: "Lagos boy with global dreams. Started as a tech blogger, now consulting for startups on brand building. I believe our association deserves to be on every tech platform's front page. Let me take us there.",
			imageUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
			bannerUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=940',
		},
		academic: {
			level: 300,
			department: 'Computer Science',
			cgpa: '4.9'
		},
		campaign: {
			profile: "Social media strategist, Content creator with 50K+ followers, Former Twitter Campus Lead. I've managed social media accounts for major brands and understand how to build engaging communities. PR isn't just about publicity; it's about purpose.",
			key_promises: [
				"10K Instagram followers in 3 months",
				"Weekly media coverage",
				"Professional brand identity",
				"Viral marketing campaigns",
				"Celebrity tech talks",
				"International recognition"
			],
		},
		manifesto: `Vibrant Students,\n\nI'm Daniel Adegoke, aspiring to be your Public Relations Officer. In today's digital age, perception is reality, and I want us to be perceived as the excellence we truly are.\n\nOUR CURRENT IMAGE PROBLEM:\n- Low social media engagement\n- No media coverage\n- Weak brand identity\n- Poor event publicity\n- Limited industry recognition\n\nMY PR MASTERPLAN - "PROJECT SPOTLIGHT":\n\n1. DIGITAL DOMINANCE\n- Instagram: Daily stories, weekly reels\n- Twitter: Real-time updates, trending hashtags\n- LinkedIn: Professional networking\n- YouTube: Weekly tech talks\n- TikTok: Viral tech content\n- Podcast: Bi-weekly episodes\n\n2. BRAND REVOLUTION\n- Professional logo redesign\n- Brand guidelines document\n- Merchandise line launch\n- Signature event series\n- Media kit creation\n- Brand ambassadors program\n\n3. MEDIA RELATIONS\n- Press release distribution\n- TV/Radio appearances\n- Newspaper features\n- Blog partnerships\n- Influencer collaborations\n- Documentary production\n\n4. EVENT AMPLIFICATION\n- Live streaming setup\n- Professional photography\n- Event hashtag campaigns\n- Pre/post event content\n- Attendee testimonials\n- Highlight reel production\n\n5. STAKEHOLDER ENGAGEMENT\n- Industry partnership showcase\n- Parent association meetings\n- Government relations\n- International collaborations\n- Alumni spotlight series\n- Sponsor appreciation program\n\nMY TRACK RECORD:\n- Grew Tech Club Instagram from 500 to 15K followers\n- Secured media coverage worth ₦2M\n- Organized viral campus campaign\n- Published in 3 national newspapers\n\nLet's make noise that matters!\n\nDaniel Adegoke - Amplifying Excellence!`,
		votes: 225,
	},
	{
		id: 'cand10',
		positionId: 'pos5',
		electionId: 'election2',
		profile: {
			name: 'Amina Mohammed',
			bio: "From Maiduguri to the world stage. I've spoken at international conferences and brought those connections back home. Every student deserves a global platform. I'm here to build it for you.",
			imageUrl: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
			bannerUrl: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=940',
		},
		academic: {
			level: 400,
			department: 'Information Systems',
			cgpa: '4.4',
		},
		campaign: {
			profile: "Community builder, Event management expert, LinkedIn Top Voice. I've organized 20+ successful tech events and built a network spanning 5 continents. I believe in the power of connections to transform careers and lives.",
			key_promises: [
				"Monthly industry networking events",
				"International partnership with 10 universities",
				"Weekly spotlight on student achievements",
				"24/7 PR response team",
				"Professional photoshoot for all members",
				"Global tech conference participation"
			],
		},
		votes: 212,
		manifesto: `Dynamic Colleagues,\n\nI'm Amina Mohammed, your bridge to the world. As PRO, I'll transform how we connect, communicate, and collaborate.\n\nTHE CONNECTION CRISIS:\n- Students feel disconnected\n- Low event turnout\n- Weak industry presence\n- No global partnerships\n- Limited opportunities\n\nMY CONNECTIVITY BLUEPRINT:\n\n1. INTERNAL ENGAGEMENT BOOST\n- Weekly department mixers\n- Skill exchange programs\n- Study buddy matching\n- Project collaboration hub\n- Social events calendar\n- Recognition programs\n\n2. INDUSTRY INTEGRATION\n- Monthly CEO talks\n- Company visit tours\n- Internship fairs\n- Mentorship matching\n- Industry project collaborations\n- Certification partnerships\n\n3. GLOBAL OUTREACH\n- International hackathons\n- Exchange programs\n- Global conference participation\n- Cross-border projects\n- International speaker series\n- Cultural tech exchanges\n\n4. CONTENT CREATION HUB\n- Student blog platform\n- Podcast studio setup\n- Video production team\n- Newsletter expansion\n- Case study publications\n- Success story documentaries\n\n5. STRATEGIC PARTNERSHIPS\n- Government agencies\n- NGO collaborations\n- Startup ecosystem integration\n- Research institutions\n- Media house partnerships\n- Tech hub alliances\n\nACHIEVEMENTS:\n- Organized Africa's largest student tech summit\n- Connected 200+ students with mentors\n- Published 50+ articles on tech education\n- Built network of 100+ industry partners\n\nConnection is the new currency. Let me enrich us all.\n\nAmina Mohammed - Connecting Dreams to Reality!`,
	},
	{
		id: 'cand11',
		positionId: 'pos1',
		electionId: 'election1',
		profile: {
			name: 'Chioma Eze',
			bio: "From Aba, where I built my first computer from spare parts. Now running a EdTech startup that's impacted 10,000+ students. I believe every student is an innovator waiting to be unleashed. Let me unlock your potential.",
			imageUrl: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
			bannerUrl: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=940',
		},
		academic: {
			level: 400,
			department: 'Software Engineering',
			cgpa: '',
		},
		campaign: {
			profile: "Serial entrepreneur, Google Developer Expert, AWS Community Builder, Microsoft MVP. I don't just talk about innovation; I live it. With 3 startups and 50+ deployed projects, I understand what it takes to succeed in tech.",
			key_promises: [
				"₦5M startup fund establishment",
				"AR/VR lab setup in 6 months",
				"100% job placement guarantee",
				"International hackathon participation",
				"Free cloud credits for all students",
				"Innovation center construction"
			],
		},
		votes: 241,
		manifesto: `Innovative Minds,\n\nI'm Chioma Eze, presenting myself for the position of President with a transformative agenda that puts INNOVATION at the center of everything we do.\n\nTHE INNOVATION IMPERATIVE:\nWhile the world moves at tech speed, our association operates in slow motion. We're training for yesterday's jobs while tomorrow's opportunities pass us by.\n\nMY BLUEPRINT - "OPERATION FUTURE-READY":\n\n1. CURRICULUM REVOLUTION\n- Partner with industry to co-create courses\n- Introduce AR/VR learning labs\n- Blockchain certification program\n- AI/ML specialization tracks\n- Quantum computing introduction\n- Cybersecurity focus area\n\n2. STARTUP ECOSYSTEM\n- ₦5M seed fund for student startups\n- Incubation space on campus\n- Legal support for founders\n- Investor pitch days\n- Startup mentorship program\n- Failure celebration events\n\n3. RESEARCH & DEVELOPMENT\n- Undergraduate research grants\n- Patent support program\n- Research publication incentives\n- Industry research partnerships\n- Annual innovation summit\n- Tech journal launch\n\n4. GLOBAL COMPETITIVENESS\n- International competition participation\n- Global certification subsidies\n- Remote work preparation\n- Cross-cultural collaboration\n- Language learning support\n- International internship program\n\n5. INCLUSIVE INNOVATION\n- Women in tech bootcamps\n- Disability tech solutions\n- Rural student support\n- Diversity hiring prep\n- Bias-free tech training\n- Equal opportunity fund\n\nPROVEN LEADERSHIP:\n- Founded 3 successful startups\n- Won 5 international hackathons\n- Published 10 research papers\n- Mentored 100+ students\n- Raised ₦10M in grants\n\nThe future won't wait. Neither should we.\n\nChioma Eze - Engineering Tomorrow, Today!`,
	},
	{
		id: 'cand12',
		positionId: 'pos2',
		electionId: 'election1',
		profile: {
			name: 'Ahmed Bello',
			bio: "From Katsina, where we believe in action over words. Led 5 student organizations to their best years ever. I don't make excuses; I make things happen. Ready to transform our association from planning to performing.",
			imageUrl: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
			bannerUrl: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=940',
		},
		academic: {
			level: 300,
			department: 'Computer Science',
			cgpa: '',
		},
		campaign: {
			profile: "Project management professional, Agile practitioner, Student union executive. I've turned around failing projects and delivered results where others saw impossibility. My approach: Plan thoroughly, execute relentlessly, deliver exceptionally.",
			key_promises: [
				"100% project completion rate",
				"30-day delivery guarantees",
				"Weekly progress updates",
				"Student satisfaction tracking",
				"Professional project management",
				"Zero excuse policy"
			],
		},
		votes: 194,
		manifesto: `Esteemed Colleagues,\n\nI'm Ahmed Bello, campaigning for Vice President with a focus on EXECUTION EXCELLENCE. Great ideas without implementation are just dreams.\n\nTHE EXECUTION GAP:\n- 80% of promised projects never materialize\n- Brilliant plans gathering dust\n- No accountability systems\n- Poor project management\n- Initiative fatigue\n\nMY EXECUTION FRAMEWORK:\n\n1. PROJECT MANAGEMENT OFFICE\n- Professional project tracking\n- Milestone monitoring\n- Resource allocation\n- Risk management\n- Quality assurance\n- Success metrics\n\n2. RAPID IMPLEMENTATION TEAMS\n- Dedicated task forces\n- 30-day project sprints\n- Agile methodology\n- Cross-functional teams\n- Student volunteers program\n- Performance rewards\n\n3. ACADEMIC EXCELLENCE DRIVE\n- Tutorial center establishment\n- Past question bank digitization\n- Group study coordination\n- Lecturer feedback system\n- Course review platform\n- Academic awards program\n\n4. WELLNESS INITIATIVES\n- Mental health support center\n- Fitness challenges\n- Nutrition programs\n- Stress management workshops\n- Work-life balance training\n- Counseling services\n\n5. PARTNERSHIP EXECUTION\n- MOU implementation tracking\n- Partner satisfaction surveys\n- Benefit realization reviews\n- Relationship management\n- Value creation metrics\n- Expansion strategies\n\nEXECUTION CREDENTIALS:\n- Delivered 20+ projects on time\n- 95% satisfaction rate\n- Certified Scrum Master\n- Six Sigma Green Belt\n- Zero failed initiatives\n\nIdeas are common. Execution is rare. I bring the rare.\n\nAhmed Bello - From Plans to Performance!`,
	},
	{
		id: 'cand13',
		positionId: 'pos3',
		electionId: 'election1',
		profile: {
			name: 'Grace Okafor',
			bio: "From Asaba, where efficiency is a way of life. Reduced processing time by 80% in my current role. I believe bureaucracy is the enemy of progress. Let me simplify your association experience.",
			imageUrl: 'https://images.pexels.com/photos/3775131/pexels-photo-3775131.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
			bannerUrl: 'https://images.pexels.com/photos/3775131/pexels-photo-3775131.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=940',
		},
		academic: {
			level: 400,
			department: 'Information Technology',
			cgpa: '',
		},
		campaign: {
			profile: "Operations management specialist, Process improvement champion, Customer service expert. I've transformed chaotic systems into smooth operations. My philosophy: If it takes more than 3 steps, it's too complicated.",
			key_promises: [
				"2-hour response time maximum",
				"Same-day document delivery",
				"Zero paperwork by month 2",
				"AI assistant launch",
				"Mobile-first everything",
				"5-star service guarantee"
			],
		},
		votes: 201,
		manifesto: `Dear Members,\n\nI'm Grace Okafor, vying for General Secretary with a mission to create SEAMLESS OPERATIONS that put members first.\n\nOPERATIONAL CHALLENGES:\n- Hours waiting for simple documents\n- Lost in bureaucratic maze\n- Inconsistent information\n- Manual everything\n- Zero user experience focus\n\nMY OPERATIONAL EXCELLENCE PLAN:\n\n1. DIGITAL TRANSFORMATION\n- One-stop service portal\n- AI chatbot for queries\n- Automated workflows\n- E-signature implementation\n- QR code everything\n- Paperless by default\n\n2. SERVICE DELIVERY STANDARDS\n- 2-hour response guarantee\n- Same-day document processing\n- Appointment scheduling system\n- Queue management app\n- Satisfaction tracking\n- Service level agreements\n\n3. KNOWLEDGE MANAGEMENT\n- Comprehensive FAQ database\n- Video tutorials library\n- Process documentation\n- Best practices guide\n- Institutional memory preservation\n- Successor training program\n\n4. MEMBER EXPERIENCE\n- Personalized dashboards\n- Progress tracking\n- Notification preferences\n- Feedback integration\n- Complaint resolution\n- Appreciation system\n\n5. OPERATIONAL METRICS\n- Response time tracking\n- Service quality scores\n- Member satisfaction index\n- Process efficiency rates\n- Cost per service\n- Continuous improvement\n\nOPERATIONAL EXPERTISE:\n- Streamlined 50+ processes\n- 99% satisfaction rating\n- ISO 9001 trained\n- Lean Six Sigma certified\n- Zero complaints record\n\nEfficiency is respect for people's time. Let me respect yours.\n\nGrace Okafor - Operations that Work for You!`,
	},
	{
		id: 'cand14',
		positionId: 'pos4',
		electionId: 'election2',
		profile: {
			name: 'Blessing Adamu',
			bio: "From Jos, where prudence is culture. Built my first profitable business at 16. I see money not as an end but as a means to lasting impact. Let me build our financial fortress.",
			imageUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
			bannerUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=940',
		},
		academic: {
			level: 300,
			department: 'Information Systems',
			cgpa: '',
		},
		campaign: {
			profile: "Financial sustainability expert, Social entrepreneur, Investment enthusiast. I've helped organizations build financial reserves and social impact programs. My promise: Transparency, growth, responsibility.",
			key_promises: [
				"Annual audited financial statements",
				"Transparent budget reporting",
				"Emergency fund establishment",
				"Investment in student projects",
				"Financial literacy workshops",
				"Cost reduction strategies"
			],
		},
		votes: 156,
		manifesto: `Dear Stakeholders,\n\nI'm Blessing Adamu, candidate for Treasurer, committed to FINANCIAL INTEGRITY and GROWTH.\n\nTHE FINANCIAL LANDSCAPE:\n- Lack of transparency\n- Irregular audits\n- Poor fund management\n- Limited financial education\n- Insufficient reserves\n\nMY FINANCIAL STRATEGY:\n\n1. TRANSPARENCY & ACCOUNTABILITY\n- Regular audits\n- Open book policy\n- Monthly financial reports\n- Budget vs actual reviews\n- Public dashboard\n- Stakeholder meetings\n\n2. FINANCIAL GROWTH\n- Diversified income streams\n- Investment in high-yield opportunities\n- Fundraising events\n- Alumni donations\n- Grant applications\n- Sponsorship programs\n\n3. RISK MANAGEMENT\n- Emergency fund creation\n- Insurance coverage\n- Fraud prevention protocols\n- Contingency planning\n- Compliance monitoring\n- Financial controls\n\n4. EDUCATION & EMPOWERMENT\n- Workshops and seminars\n- Personal finance coaching\n- Budgeting tools\n- Debt management support\n- Savings incentives\n- Investment clubs\n\n5. COST OPTIMIZATION\n- Expense audits\n- Vendor negotiations\n- Efficient procurement\n- Resource sharing\n- Technology adoption\n- Waste reduction\n\nCREDENTIALS:\n- Managed ₦50M budget\n- Certified Accountant\n- Award-winning social entrepreneur\n- Financial modeling expert\n- Zero audit exceptions\n\nLet's build a financial foundation that lasts.\n\nBlessing Adamu - Stewardship You Can Trust!`,
	},
	{
		id: 'cand15',
		positionId: 'pos5',
		electionId: 'election2',
		profile: {
			name: 'Tunde Ogundimu',
			bio: "From Ibadan, where storytelling is art. Built my first viral campaign at 17. I believe every student has a story worth sharing with the world. Let me be your storyteller-in-chief.",
			imageUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
			bannerUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=940',
		},
		academic: {
			level: 400,
			department: 'Computer Science',
			cgpa: '',
		},
		campaign: {
			profile: "Digital influencer, Brand strategist, Content creation expert. I've built brands from scratch to national recognition. My superpower: Making ordinary stories extraordinary and extraordinary stories unforgettable.",
			key_promises: [
				"1 million reach in 6 months",
				"National media coverage weekly",
				"100K social media followers",
				"₦10M in brand value",
				"Top 10 student association ranking",
				"Continental recognition"
			],
		},
		manifesto: `Creative Innovators,\n\nI'm Tunde Ogundimu, ready to serve as your PRO with a vision to make our association the MOST INFLUENTIAL student tech community in Africa.\n\nINFLUENCE DEFICIT:\n- Nobody knows our achievements\n- Zero brand recognition\n- No thought leadership\n- Weak online presence\n- Limited network effect\n\nMY INFLUENCE AMPLIFICATION STRATEGY:\n\n1. CONTENT DOMINATION\n- Daily blog posts\n- Weekly podcasts\n- Monthly webinars\n- Quarterly magazines\n- Annual documentary\n- 24/7 content stream\n\n2. PLATFORM BUILDING\n- 100K YouTube subscribers\n- 50K Twitter followers\n- 30K LinkedIn connections\n- 20K Instagram engagement\n- 10K email subscribers\n- 1M annual reach\n\n3. THOUGHT LEADERSHIP\n- TEDx talks\n- Conference keynotes\n- Media interviews\n- Opinion pieces\n- Research publications\n- Policy influence\n\n4. STRATEGIC ALLIANCES\n- Tech giant partnerships\n- Media house collaborations\n- Influencer networks\n- Government relations\n- International associations\n- Industry coalitions\n\n5. BRAND MONETIZATION\n- Sponsored content\n- Event partnerships\n- Merchandise sales\n- Course offerings\n- Consulting services\n- IP licensing\n\nINFLUENCE CREDENTIALS:\n- 100K personal following\n- Featured in 20+ publications\n- 5 viral campaigns\n- ₦50M PR value generated\n- Top 10 tech influencer\n\nInfluence is the new wealth. Let's be rich.\n\nTunde Ogundimu - Making You Famous for the Right Reasons!`,
		votes: 229,
	}
];
