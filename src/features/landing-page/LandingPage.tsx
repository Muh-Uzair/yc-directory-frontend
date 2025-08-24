import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Rocket,
  Users,
  Trophy,
  Target,
  CheckCircle,
  TrendingUp,
  Globe,
  Lightbulb,
  Shield,
  Zap,
} from "lucide-react";
import React from "react";

const LandingPage: React.FC = () => {
  return (
    <div>
      <StartupConnection />
      <PlatformFeatures />
      <WhyYCDirectory />
      <StartupCriteria />
      <SuccessShowcase />
      <YCDirectoryFooter />
    </div>
  );
};

export default LandingPage;

const StartupConnection: React.FC = () => {
  return (
    <div className="flex justify-center items-center bg-primary">
      <div className="tab:px-[50px] tab:py-[50px] dark:bg-background bg-primary px-[20px] max-w-[1200px] py-[30px] text-center">
        <div>
          <span className="laptopS:text-[35px] text-[30px] font-black text-white">
            Showcase Your Startup to the World
          </span>
        </div>
        <div className="mt-[20px]">
          <span className="text-[18px] text-white">
            Join the premier directory of innovative startups from around the
            globe. Connect with active investors seeking the next big
            opportunity, strategic partners ready to collaborate, and early
            customers who love discovering cutting-edge solutions. Whether
            you&apos;re building the next unicorn or solving a niche problem, YC
            Directory gives you the visibility and connections you need to scale
            faster and smarter.
          </span>
        </div>
        <div className="mt-[30px] font-semibold text-white">
          Signup Now ToSubmit Your Startup
        </div>
      </div>
    </div>
  );
};

const PlatformFeatures: React.FC = () => {
  return (
    <div className="dark:bg-background flex w-full items-center justify-center bg-stone-100">
      <div className="max-w-[1200px]">
        <div className="dark:bg-background bg-stone-100">
          <div className="tab:px-[50px] tab:py-[50px] px-[20px] py-[30px]">
            <div className="text-center">
              <span className="text-[22px] font-bold">
                What YC Directory Offers
              </span>
            </div>

            <div className="laptopS:grid laptopS:grid-cols-3 flex flex-col gap-[20px] pt-[30px]">
              <div>
                <PlatformFeatureCard
                  icon={<Rocket size={40} className="text-primary" />}
                  cardTitle="Launch Your Startup"
                  cardDescription="Get your startup discovered by the right audience"
                  cardContent="Create a compelling profile that showcases your product, team, and vision. Share your startup story, highlight key metrics, and demonstrate traction. Stand out in a curated directory where innovation meets opportunity."
                />
              </div>

              <div>
                <PlatformFeatureCard
                  icon={<Users size={40} className="text-primary" />}
                  cardTitle="Connect With Community"
                  cardDescription="Build meaningful relationships within the startup ecosystem"
                  cardContent="Network with fellow entrepreneurs, potential co-founders, and industry experts. Join discussions, share insights, and learn from successful founders. Build the connections that will accelerate your growth journey."
                />
              </div>

              <div>
                <PlatformFeatureCard
                  icon={<Trophy size={40} className="text-primary" />}
                  cardTitle="Gain Visibility"
                  cardDescription="Increase your startup's exposure to investors and customers"
                  cardContent="Featured listings get thousands of views from investors, journalists, and potential customers. Leverage our platform's reach to amplify your startup's presence and attract the attention you deserve the most for newly created startup."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface PropsPlatformFeatureCard {
  icon?: React.ReactNode;
  cardTitle?: string;
  cardDescription?: string;
  cardContent?: string;
}

const PlatformFeatureCard: React.FC<PropsPlatformFeatureCard> = ({
  icon,
  cardTitle,
  cardDescription,
  cardContent,
}) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle>
          <div className="mb-[10px]">{icon}</div>
          {cardTitle}
        </CardTitle>
        <CardDescription>{cardDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <span className="text-[15px]">{cardContent}</span>
      </CardContent>
    </Card>
  );
};

const WhyYCDirectory: React.FC = () => {
  return (
    <div className="dark:bg-background/95 flex w-full items-center justify-center">
      <div className="tab:px-[50px] tab:py-[50px] w-full max-w-[1200px] px-[20px] py-[30px]">
        <div className="mb-[30px] max-w-[700px]">
          <span className="text-[22px] font-bold text-primary-dark dark:text-primary">
            Why YC Directory Is The Perfect Platform For Your Startup Journey
          </span>
        </div>
        <div className="tab:pl-[30px] max-w-[700px]">
          <span className="text-stone-600 dark:text-stone-100">
            YC Directory is more than just a startup listing platform -
            it&apos;s your launchpad to success. <br />
            Whether you&apos;re in the ideation phase or ready to scale,
            showcase your startup to a global audience of investors, partners,
            and customers. <br />
            Our platform features startups across all industries - from SaaS and
            fintech to healthtech and climate solutions. <br />
            Use our intuitive submission process to create detailed profiles
            with pitch decks, team information, and traction metrics. <br />
            Get discovered through powerful search and filtering options that
            help the right people find your startup. <br />
            Access valuable resources, founder stories, and industry insights to
            accelerate your growth. <br />
            Connect directly with investors who are actively seeking new
            opportunities in your sector. <br />
            Track your profile performance with analytics and engagement
            metrics. <br />
            Join a community of ambitious founders who are building the future.{" "}
            <br />
            Whether you&apos;re seeking funding, customers, or talent, YC
            Directory connects you with the opportunities that matter. <br />
            Start your journey today and let the world discover what you&apos;re
            building.
          </span>
        </div>
      </div>
    </div>
  );
};

const StartupCriteria: React.FC = () => {
  return (
    <div className="flex w-full items-center justify-center border-[1px] border-primary-dark bg-primary dark:bg-primary-extra-drak">
      <div className="max-w-[1200px]">
        <div className="bg-primary dark:bg-primary-dark">
          <div className="tab:px-[50px] tab:py-[50px] px-[20px] py-[30px]">
            <div className="text-center">
              <span className="text-[22px] font-bold text-primary-dark dark:text-primary">
                What Makes YC Directory Special
              </span>
            </div>

            <div className="laptopS:grid laptopS:grid-cols-3 flex flex-col gap-[20px] pt-[30px]">
              <div>
                <PlatformFeatureCard
                  icon={<Target size={40} className="text-primary" />}
                  cardTitle="Quality Over Quantity"
                  cardDescription="Curated startups with real potential and traction"
                  cardContent="We feature startups that demonstrate genuine innovation, market validation, and growth potential. Each submission is reviewed to ensure quality, giving visitors confidence that they're discovering legitimate, promising ventures worth their attention."
                />
              </div>

              <div>
                <PlatformFeatureCard
                  icon={<Shield size={40} className="text-primary" />}
                  cardTitle="Verified Startup Profiles"
                  cardDescription="Authentic information you can trust and rely on"
                  cardContent="Every startup profile goes through our verification process to ensure accuracy and authenticity. We validate company information, founder credentials, and key metrics. This builds trust between startups and potential investors, partners, and customers."
                />
              </div>

              <div>
                <PlatformFeatureCard
                  icon={<Zap size={40} className="text-primary" />}
                  cardTitle="Instant Global Exposure"
                  cardDescription="Reach thousands of potential investors and partners worldwide"
                  cardContent="Once approved, your startup gains immediate visibility to our global community of investors, entrepreneurs, and industry professionals. Our platform's reach ensures your startup gets the exposure it needs to attract the right opportunities and partnerships."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SuccessShowcase: React.FC = () => {
  return (
    <div className="dark:bg-background bg-white">
      <div className="flex w-full items-center justify-center">
        <div className="max-w-[1200px]">
          <div className="tab:px-[50px] tab:py-[50px] px-[20px] py-[30px]">
            <div className="text-center mb-[30px]">
              <span className="text-[22px] font-bold text-primary-dark dark:text-primary">
                Success Stories From Our Community
              </span>
            </div>

            <div className="laptopS:grid laptopS:grid-cols-2 flex flex-col gap-[30px]">
              <div>
                <SuccessStoryCard
                  icon={<TrendingUp size={40} className="text-green-600" />}
                  metric="$2.5M+"
                  description="Average funding raised by featured startups"
                  details="Startups in our directory have collectively raised millions in funding from angel investors, VCs, and strategic partners."
                />
              </div>

              <div>
                <SuccessStoryCard
                  icon={<Globe size={40} className="text-blue-600" />}
                  metric="50k+"
                  description="Monthly visitors discovering new startups"
                  details="Our growing community of investors, partners, and customers actively browse and engage with startup profiles."
                />
              </div>

              <div>
                <SuccessStoryCard
                  icon={<Lightbulb size={40} className="text-yellow-600" />}
                  metric="1000+"
                  description="Innovative startups already featured"
                  details="From AI and blockchain to sustainability and healthcare, diverse startups call YC Directory home."
                />
              </div>

              <div>
                <SuccessStoryCard
                  icon={<CheckCircle size={40} className="text-primary" />}
                  metric="95%"
                  description="Startup founders recommend our platform"
                  details="Founders consistently rate YC Directory as their preferred platform for startup exposure and networking."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface PropsSuccessStoryCard {
  icon?: React.ReactNode;
  metric?: string;
  description?: string;
  details?: string;
}

const SuccessStoryCard: React.FC<PropsSuccessStoryCard> = ({
  icon,
  metric,
  description,
  details,
}) => {
  return (
    <div className="p-6 border border-stone-200 dark:border-stone-700 rounded-lg hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center mb-4">
        {icon}
        <div className="ml-4">
          <div className="text-2xl font-bold text-primary-dark dark:text-primary">
            {metric}
          </div>
          <div className="text-sm font-semibold text-stone-600 dark:text-stone-300">
            {description}
          </div>
        </div>
      </div>
      <p className="text-sm text-stone-500 dark:text-stone-400">{details}</p>
    </div>
  );
};

const YCDirectoryFooter: React.FC = () => {
  return (
    <footer className="bg-primary-extra-dark text-stone-50">
      <div className="tab:px-[50px] tab:py-[50px] mx-auto flex w-full max-w-[1200px] flex-col gap-[40px] px-[20px] py-[40px] md:flex-row md:justify-between">
        {/* Column 1: Brand */}
        <div className="w-full md:w-1/4">
          <h2 className="text-xl font-bold text-white">YC Directory</h2>
          <p className="mt-3 text-sm text-stone-300">
            The premier platform for discovering and showcasing innovative
            startups from around the world.
          </p>
        </div>

        {/* Column 2: Platform */}
        <div>
          <h4 className="mb-3 text-lg font-semibold text-white">Platform</h4>
          <ul className="space-y-2 text-sm text-stone-300">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Browse Startups
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Submit Startup
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Success Stories
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Get Featured
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Community */}
        <div>
          <h4 className="mb-3 text-lg font-semibold text-white">Community</h4>
          <ul className="space-y-2 text-sm text-stone-300">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                For Founders
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                For Investors
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Newsletter
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Events
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Support */}
        <div>
          <h4 className="mb-3 text-lg font-semibold text-white">Support</h4>
          <ul className="space-y-2 text-sm text-stone-300">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Guidelines
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-stone-600 py-[20px] text-center text-sm text-stone-400">
        © {new Date().getFullYear()} YC Directory. Empowering startups to reach
        their full potential.
      </div>
    </footer>
  );
};
