import { CardFooter, CardContent, CardHeader, CardDescription, Card, CardTitle } from "@/components/ui/card";
import { BriefcaseIcon, CheckIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import HeroImage from "../../public/placeholder.png";
import FetaureImage from "../../public/features.jpeg";
import Header from "@/components/header";
import AnimatedGradientText from "@/components/magicui/animated-gradient-text";
import AnimatedShinyText from "@/components/magicui/animated-shiny-text";
import ShimmerButton from "@/components/magicui/shimmer-button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header />
      <div className='space-x-6 text-[#6c5ce7] ml-4 mt-2'>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/#features">
          Features
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/#testimonials">
          Testimonials
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/#pricing">
          Pricing
        </Link>
      </div>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Find your dream internship with Internee
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Internee is the ultimate platform for students to showcase their profiles and connect with top
                    employers for internship opportunities.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="/sign-up"
                  >
                    <ShimmerButton
                      shimmerSize="0.2em"
                      shimmerDuration="3s"
                      background="#6c5ce7"
                    >Sign Up</ShimmerButton>
                  </Link>
                </div>
              </div>
              <Image
                src={HeroImage}
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                width={"550"}
                height={"310"}
              />
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-[#6c5ce7] px-3 py-1 text-sm dark:bg-[#6c5ce7]">
                    Key Features
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Streamline your internship search</h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Internee offers a seamless platform for students to create their profiles, browse and apply for
                    internships, and track their application status.
                  </p>
                </div>
                <ul className="grid gap-2 py-4">
                  <li>
                    <CheckIcon className="mr-2 inline-block h-4 w-4" />
                    Easy profile creation to showcase your skills and experiences.
                  </li>
                  <li>
                    <CheckIcon className="mr-2 inline-block h-4 w-4" />
                    Intelligent matching algorithm to connect you with relevant internship opportunities.
                  </li>
                  <li>
                    <CheckIcon className="mr-2 inline-block h-4 w-4" />
                    Comprehensive application tracking to stay on top of your internship search.
                  </li>
                </ul>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    className="inline-flex h-10 items-center justify-center rounded-md border border-[#6c5ce7] bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-[#6c5ce7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#6c5ce7] disabled:pointer-events-none disabled:opacity-50 dark:border-[#6c5ce7] dark:bg-gray-950 dark:hover:bg-[#6c5ce7]/20 dark:hover:text-gray-50 dark:focus-visible:ring-[#6c5ce7]"
                    href="/sign-up"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              <Image
                src={FetaureImage}
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                width={"550"}
                height={"310"}
              />
            </div>
          </div>
        </section>
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-[#f4f4f4] dark:bg-gray-800">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What our users say</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Hear from our satisfied students and employers who have found success with Internee.
              </p>
            </div>
            <div className="divide-y rounded-lg border dark:border-gray-700">
              <div className="grid w-full grid-cols-1 items-stretch justify-center divide-y md:grid-cols-2 md:divide-y-0 md:divide-x dark:divide-gray-700">
                <div className="mx-auto flex w-full flex-col items-center justify-center p-4 sm:p-8">
                  <blockquote className="text-lg font-semibold leading-snug lg:text-xl lg:leading-normal xl:text-2xl">
                    “Internee made it so easy for me to find the perfect internship. The platform is intuitive and the
                    matching algorithm is spot on.“
                  </blockquote>
                  <div className="mt-4">
                    <div className="font-semibold">Emma Gonzalez</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Student, University of California</div>
                  </div>
                </div>
                <div className="mx-auto flex w-full flex-col items-center justify-center p-4 sm:p-8">
                  <blockquote className="text-lg font-semibold leading-snug lg:text-xl lg:leading-normal xl:text-2xl">
                    “Internee has been a game-changer for our company. We&apos;ve been able to connect with talented students and build a strong pipeline of future hires.“
                  </blockquote>
                  <div className="mt-4">
                    <div className="font-semibold">Michael Johnson</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Hiring Manager, Acme Inc.</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md border border-[#6c5ce7] bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-[#6c5ce7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#6c5ce7] disabled:pointer-events-none disabled:opacity-50 dark:border-[#6c5ce7] dark:bg-gray-950 dark:hover:bg-[#6c5ce7]/20 dark:hover:text-gray-50 dark:focus-visible:ring-[#6c5ce7]"
                href="/sign-up"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container grid items-center justify-center gap-4 px-4 md:px-6">
            <div className="space-y-3">
              <div className="inline-block rounded-lg bg-[#6c5ce7] px-3 py-1 text-sm dark:bg-[#6c5ce7]">Pricing</div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Affordable plans for every student
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Choose the plan that best fits your needs and budget.
              </p>
            </div>
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-8">
              <Card className="bg-white dark:bg-gray-950">
                <CardHeader className="border-b border-gray-200 dark:border-gray-700 p-6">
                  <CardTitle>Free</CardTitle>
                  <div className="mt-2 flex items-baseline">
                    <span className="text-4xl font-bold">$0</span>
                    <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                      Create profile
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                      Browse internships
                    </li>
                    <li className="flex items-center">
                      <XIcon className="mr-2 h-4 w-4 text-red-500" />
                      Apply to internships
                    </li>
                    <li className="flex items-center">
                      <XIcon className="mr-2 h-4 w-4 text-red-500" />
                      Track applications
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="border-t border-gray-200 dark:border-gray-700 p-6" />
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
