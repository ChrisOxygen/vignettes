import PagesHeader from "@/features/external-view/components/PagesHeader";
import SectionTitle from "@/features/external-view/components/SectionTitle";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";
import SupportedCountriesSection from "@/features/external-view/components/SupportedCountriesSection";
import TestimonialSection from "@/features/external-view/components/TestimonialSection";
import CTASection from "@/features/external-view/components/CTASection";

function PartnerInstitutionPage() {
  const partnerInstitutions = {
    "United Kingdom": [
      "Buckinghamshire New University (BUCKS)",
      "British Study Centres University Pathways",
      "Brunel University London",
      "Cardiff Metropolitan University",
      "Coventry University",
      "Cranfield University",
      "David Game College, London UK",
      "De Montfort University",
      "Glasgow Caledonian University",
      "Kingston University London",
      "Leeds Beckett University",
      "London South Bank University",
      "Loughborough University",
      "Middlesex University, London",
      "Nottingham Trent University",
      "Oxford Brookes University",
      "Ravensbourne University",
      "Regent College London",
      "Royal Holloway, University of London",
      "Swansea University",
      "Teesside University",
      "University of Bradford",
      "University of Bedfordshire",
      "University of Essex",
      "University of Greenwich",
      "University of Hertfordshire",
      "University of Kent",
      "University of Liverpool",
      "University of Portsmouth",
      "University of Reading",
      "University of South Wales",
      "University of Strathclyde",
      "University of Surrey",
      "University of Sussex",
      "University of the West of England",
      "University of Wolverhampton",
    ],
    "United States of America": [
      "Adelphi University",
      "Alma College",
      "Arizona State University",
      "Arkansas State University",
      "Auburn University",
      "Audacia Novatio Business College",
      "Bay Atlantic University",
      "Bishop's University",
      "California State University, Channel Islands",
      "California State University, Chico",
      "California State University, Dominguez Hills",
      "California State University, East Bay",
      "California State University, Long Beach",
      "California State University, Monterey Bay",
      "California State University, Northridge",
      "California State University, San Bernardino",
      "Calvin University",
      "Central Michigan University",
      "Clarkson University",
      "Cleveland State University",
      "College of San Mateo",
      "College of the Canyons",
      "Colorado State University – Pueblo",
      "Concordia University Chicago",
      "ECPI University",
      "Edmonds College",
      "Elgin Community College",
      "Elizabethtown College",
      "Embry Riddle Aeronautical University",
      "Embry-Riddle Aeronautical University",
      "Felician University",
      "Fordham University, Gabelli School of Business",
      "Full Sail University",
      "Gannon University",
      "Grand Valley State University",
      "High Point University",
      "Hope College",
      "Humboldt State University",
      "Indiana University – Purdue University Indianapolis",
      "Iowa State University",
      "Lake Tahoe Community College",
      "Lewis-Clark State College",
      "Lincoln University",
      "Long Island University",
      "Madison College",
      "Northeastern Illinois University",
      "Northeastern University",
      "Notre Dame High School",
      "Ohio Wesleyan University",
      "Olympic College",
      "Pacific Lutheran University",
      "Rice University",
      "Roger Williams University",
      "Sacred Heart University-USA",
      "San Francisco State University",
      "Santa Monica College",
      "Santa Rosa Junior College",
      "SCAD",
      "Schiller International University",
      "Shoreline Community College",
      "Southeast Missouri State University",
      "SUNY Oswego",
      "Tennessee Technological University",
      "The American University of Barbados School of Medicine",
      "The Chicago School of Professional Psychology",
      "The University of Alabama",
      "The University of Arizona",
      "The University of New Mexico",
      "The University of Southern Mississippi",
      "Tiffin University",
      "Touro College Graduate School of Technology",
      "Trine University",
      "University of Arizona",
      "University of California, Riverside",
      "University of Central Missouri",
      "University of Colorado – Denver",
      "University of Colorado Denver",
      "University of Delaware",
      "University of Findlay",
      "University of Idaho",
      "University of Illinois at Chicago",
      "University of New Haven",
      "University of Notre Damec",
      "University of Texas at Tyler",
      "University of Wisconsin – Stout",
      "University of Wyoming",
      "Valencia College",
      "Wayne State University",
      "Webster University",
      "Westcliff University",
      "Western Michigan University",
      "Whitworth University",
      "Wilkes University",
    ],
    Canada: [
      "Alexander College",
      "Algoma University",
      "Bishop's University",
      "Bow Valley College",
      "British Columbia Institute of Technology",
      "Brock University",
      "Brock University Faculty of Education",
      "Canadian College of Technology and Business",
      "Canadore College",
      "Centennial College",
      "Conestoga College",
      "Douglas College",
      "Fanshawe College",
      "Fleming College",
      "Focus College, Abbotsford",
      "George Brown College",
      "Georgian College",
      "Great Lakes College of Toronto",
      "Herzing College",
      "Humber College Institute of Technology",
      "Insignia College",
      "International Business University",
      "Justice Institute of British Columbia",
      "King's University College at Western University",
      "Kwantlen Polytechnic University",
      "Lakehead University",
      "Langara College",
      "Languages Across Borders",
      "London International Academy, Canada",
      "Loyalist College of Applied Arts and Technology",
      "Manitoba Institute of Trades and Technology",
      "Mohawk College",
      "Niagara College Canada",
      "Red Deer Polytechnic at Sterling College",
      "Red River College Polytechnic",
      "Royal Roads University",
      "Saskatchewan Polytechnic",
      "Seneca College",
      "Sheridan College",
      "Southern Alberta Institute of Technology",
      "St. Clair College",
      "The University of Winnipeg Collegiate",
      "Thompson Rivers University",
      "Toronto Metropolitan University (TMU)",
      "Toronto School of Management",
      "Trebas Institute",
      "University Canada West",
      "University of Guelph",
      "University of Lethbridge",
      "University of Manitoba",
      "University of Regina",
      "University of Saskatchewan",
      "University of the Fraser Valley",
      "University of Windsor",
      "Western University",
      "York University",
      "Yorkville University",
    ],
    "The Republic of Ireland": [
      "Dublin Business School",
      "Dublin City University – Glasnevin",
      "IBAT College - Dublin",
      "Maynooth University",
      "Technological University of the Shannon: Midlands Midwest (TUS)",
      "Trinity College Dublin",
      "UniHaven College",
      "University College Cork",
      "University College Dublin",
      "University of Limerick",
    ],
  };

  return (
    <main className="flex flex-col w-full">
      <PagesHeader />
      <SupportedCountriesSection />
      <section className="flex w-full flex-col gap-6 items-center px-4 sm:px-6">
        <div className="mx-auto pt-16 pb-32 sm:pt-20 sm:pb-40 lg:pt-26 lg:pb-72 max-w-7xl flex flex-col items-center gap-10 w-full">
          <SectionTitle
            subtitle="Partner Institutions"
            title="We are in Partnership with over 300 Global Institutions"
            className="max-w-4xl"
          />

          <div className="w-full max-w-4xl space-y-6">
            <div className="prose prose-slate max-w-none">
              <p className="text-muted-foreground text-center mb-8">
                Insights and Vignettes Limited (IVL) is Nigeria&apos;s leading
                immigration and education consultancy, operating in Lagos,
                Nigeria, with Representatives in some African Countries,
                including Ghana and Kenya. We keep this list updated as we grow
                in operations and in partnership with institutions abroad.
                Please contact us if you cannot find a preferred institution on
                this list.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {Object.entries(partnerInstitutions).map(
                ([country, institutions]) => (
                  <AccordionItem key={country} value={country}>
                    <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                      <div className="flex items-center gap-3">
                        <span>{country}</span>
                        <span className="text-sm font-normal text-muted-foreground">
                          ({institutions.length} institutions)
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4">
                        {institutions.map((institution) => (
                          <li
                            key={institution}
                            className="flex items-start gap-2 text-sm"
                          >
                            <span className="text-primary mt-1">•</span>
                            <span>{institution}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                )
              )}
            </Accordion>
          </div>
        </div>
      </section>
      <CTASection />
      <TestimonialSection />
    </main>
  );
}

export default PartnerInstitutionPage;
