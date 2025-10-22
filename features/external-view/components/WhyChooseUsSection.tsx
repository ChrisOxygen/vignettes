import { IoCheckmarkCircleOutline } from "react-icons/io5";

function WhyChooseUsSection() {
  return (
    <section className="flex w-full flex-col gap-6 items-center px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[url('/assets/imgi_5_hero-3.webp')] bg-no-repeat bg-center bg-cover bg-fixed filter brightness-[30%] saturate-[139%] contrast-[118%]"></div>
      <div className="absolute inset-0 -z-10 bg-black/50"></div>
      <div className="mx-auto py-16 sm:py-20 lg:py-26 max-w-7xl flex flex-col items-center gap-10 w-full">
        <div className="flex flex-col lg:flex-row items-start lg:items-end w-full justify-between gap-6">
          <div className={`flex flex-col gap-3`}>
            <span className="text-sm font-medium text-primary uppercase tracking-wide">
              Why Choose Us
            </span>
            <h2 className="scroll-m-20 text-3xl md:text-4xl lg:text-5xl max-w-3xl font-bold text-white tracking-tight">
              Benefits of working with Insights and Vignettes Limited (IVL)
            </h2>
          </div>
          <p className="text-white lg:max-w-[400px] max-w-[800px] text-sm sm:text-base">
            Here are some of the benefits of working with Insights and Vignettes
            Limited to achieve your moving abroad and study abroad goal.
          </p>
        </div>
        <div className="flex flex-col md:flex-row w-full items-start md:items-center justify-between gap-8 md:gap-6">
          {/* Column 1 */}
          <div className="flex flex-col gap-4 flex-1 w-full">
            <div className="flex items-start gap-3 md:block">
              <IoCheckmarkCircleOutline className="text-primary text-xl flex-shrink-0 mt-1 md:hidden" />
              <span className="text-white text-sm sm:text-base font-semibold">
                Insights and tools on talent visa (UK Global Talent Visa, US
                EB2-NIW, US EB1A)
              </span>
            </div>
            <div className="flex items-start gap-3 md:block">
              <IoCheckmarkCircleOutline className="text-primary text-xl flex-shrink-0 mt-1 md:hidden" />
              <span className="text-white text-sm sm:text-base font-semibold">
                Guaranteed admission
              </span>
            </div>
            <div className="flex items-start gap-3 md:block">
              <IoCheckmarkCircleOutline className="text-primary text-xl flex-shrink-0 mt-1 md:hidden" />
              <span className="text-white text-sm sm:text-base font-semibold">
                We promote only post-graduation work permit eligible study
                programs
              </span>
            </div>
          </div>

          {/* Divider 1 */}
          <div className="hidden md:block w-[2px] min-h-[200px] bg-primary flex-shrink-0"></div>

          {/* Column 2 */}
          <div className="flex flex-col gap-4 flex-1 w-full">
            <div className="flex items-start gap-3 md:block">
              <IoCheckmarkCircleOutline className="text-primary text-xl flex-shrink-0 mt-1 md:hidden" />
              <span className="text-white text-sm sm:text-base font-semibold">
                Access to crucial information like program tuition fees payment
                plan
              </span>
            </div>
            <div className="flex items-start gap-3 md:block">
              <IoCheckmarkCircleOutline className="text-primary text-xl flex-shrink-0 mt-1 md:hidden" />
              <span className="text-white text-sm sm:text-base font-semibold">
                Visa application support
              </span>
            </div>
            <div className="flex items-start gap-3 md:block">
              <IoCheckmarkCircleOutline className="text-primary text-xl flex-shrink-0 mt-1 md:hidden" />
              <span className="text-white text-sm sm:text-base font-semibold">
                Work-Study Option Available
              </span>
            </div>
          </div>

          {/* Divider 2 */}
          <div className="hidden md:block w-[2px] min-h-[200px] bg-primary flex-shrink-0"></div>

          {/* Column 3 */}
          <div className="flex flex-col gap-4 flex-1 w-full">
            <div className="flex items-start gap-3 md:block">
              <IoCheckmarkCircleOutline className="text-primary text-xl flex-shrink-0 mt-1 md:hidden" />
              <span className="text-white text-sm sm:text-base font-semibold">
                No IELTS/TOEFL Needed
              </span>
            </div>
            <div className="flex items-start gap-3 md:block">
              <IoCheckmarkCircleOutline className="text-primary text-xl flex-shrink-0 mt-1 md:hidden" />
              <span className="text-white text-sm sm:text-base font-semibold">
                Year-round intakes include January, May, September, October &
                November
              </span>
            </div>
            <div className="flex items-start gap-3 md:block">
              <IoCheckmarkCircleOutline className="text-primary text-xl flex-shrink-0 mt-1 md:hidden" />
              <span className="text-white text-sm sm:text-base font-semibold">
                Scholarships in form of tuition fees discount are available in
                some cases
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUsSection;
