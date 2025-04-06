import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample impact data (this would typically come from an API)
const impactData = {
  "2023": {
    meals: 68000,
    families: 3400,
    volunteers: 350,
    events: 42,
    highlights: [
      "Expanded food distribution to 5 new communities in Sahiwal",
      "Launched monthly nutrition workshop for beneficiary families",
      "Formed partnerships with 12 local businesses for regular food donations",
      "Implemented new digital tracking system for donation distribution",
      "Conducted volunteer training programs reaching 350 individuals"
    ]
  },
  "2022": {
    meals: 52000,
    families: 2600,
    volunteers: 280,
    events: 36,
    highlights: [
      "Initiated weekend food program for school children",
      "Created community vegetable gardens in 3 neighborhoods",
      "Extended operations to 2 new areas in Lahore",
      "Conducted 6 food security awareness campaigns",
      "Introduced family nutrition packages with balanced food items"
    ]
  },
  "2021": {
    meals: 43000,
    families: 2150,
    volunteers: 210,
    events: 30,
    highlights: [
      "Provided emergency food relief during pandemic lockdowns",
      "Established mobile food distribution vans for remote areas",
      "Developed partnership with 5 local farmers for fresh produce",
      "Created a formal volunteer program with training modules",
      "Launched food donation drives during Ramadan and Eid festivals"
    ]
  }
};

export default function ImpactReports() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl text-[rgba(60,60,185)] font-bold mb-4">Our Impact</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're committed to transparency and accountability. Explore our impact reports to see how your support is making a difference.
          </p>
        </div>
        
        <Tabs defaultValue="2023" className="max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="2023">2023</TabsTrigger>
            <TabsTrigger value="2022">2022</TabsTrigger>
            <TabsTrigger value="2021">2021</TabsTrigger>
          </TabsList>
          
          {Object.entries(impactData).map(([year, data]) => (
            <TabsContent key={year} value={year} className="mt-0">
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold mb-4 text-center">{year} Impact Report</h3>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      <div className="text-center p-4 bg-primary/5 rounded-lg">
                        <div className="text-3xl font-bold text-[rgba(60,60,185)] mb-1">{data.meals.toLocaleString()}</div>
                        <p className="text-sm text-gray-600">Meals Provided</p>
                      </div>
                      <div className="text-center p-4 bg-primary/5 rounded-lg">
                        <div className="text-3xl font-bold text-[rgba(60,60,185)] mb-1">{data.families.toLocaleString()}</div>
                        <p className="text-sm text-gray-600">Families Supported</p>
                      </div>
                      <div className="text-center p-4 bg-primary/5 rounded-lg">
                        <div className="text-3xl font-bold text-[rgba(60,60,185)] mb-1">{data.volunteers}</div>
                        <p className="text-sm text-gray-600">Active Volunteers</p>
                      </div>
                      <div className="text-center p-4 bg-primary/5 rounded-lg">
                        <div className="text-3xl font-bold text-[rgba(60,60,185)] mb-1">{data.events}</div>
                        <p className="text-sm text-gray-600">Distribution Events</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold mb-3">Key Achievements</h4>
                      <ul className="space-y-2">
                        {data.highlights.map((highlight, index) => (
                          <motion.li 
                            key={index} 
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="flex items-start"
                          >
                            <span className="text-primary mr-2">•</span>
                            <span className="text-gray-700">{highlight}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}