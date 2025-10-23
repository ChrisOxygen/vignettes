"use client";

import PagesHeader from "@/features/external-view/components/PagesHeader";
import SectionTitle from "@/features/external-view/components/SectionTitle";
import React from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Label } from "@/shared/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactFormSchema,
  type ContactFormData,
} from "@/features/external-view/validators/contact.validator";
import { useSendContactForm } from "@/features/external-view/hooks";

function ContactPage() {
  const [successMessage, setSuccessMessage] = React.useState<string | null>(
    null
  );

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const { mutate: sendContactForm, isPending } = useSendContactForm({
    onSuccess: (data) => {
      setSuccessMessage(data.message || "Message sent successfully!");
      form.reset();
      // Clear success message after 5 seconds
      setTimeout(() => setSuccessMessage(null), 5000);
    },
    onError: (error) => {
      console.error("Contact form error:", error);
      // You can add toast notification here if you have a toast system
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    sendContactForm(data);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us Anytime",
      content: ["+234 703 959 4474", "+234 903 465 5589"],
      href: "tel:+2347039594474",
    },
    {
      icon: Mail,
      title: "Email Our Team",
      content: [
        "info@insights4globaltalents.com",
        "myvisa@insights4globaltalents.com",
      ],
      href: "mailto:info@insights4globaltalents.com",
    },
    {
      icon: MapPin,
      title: "Visit Our Office",
      content: ["TheBunker, 279 Hebert Marcaulay Way, Yaba"],
      href: "https://maps.google.com/?q=TheBunker,279+Hebert+Marcaulay+Way,Alagomeji,Yaba",
    },
  ];

  return (
    <main className="flex flex-col w-full">
      <PagesHeader />
      <section className="flex w-full flex-col gap-6 items-center px-4 sm:px-6 bg-gradient-to-b from-transparent via-transparent to-primary/5">
        <div className="mx-auto py-16 sm:py-20 lg:py-26 max-w-4xl flex flex-col items-center gap-16 w-full">
          {/* Header Section */}
          <div className="">
            <SectionTitle
              subtitle="contact us"
              title="Let's get in touch"
              className="mb-4"
              alignment="left"
            />
            <p className="text-lg text-left text-muted-foreground">
              Have questions about our immigration services? We&apos;re here to
              help you navigate your journey to global opportunities. Reach out
              to our expert team today.
            </p>
          </div>

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 border-b pb-6 gap-6 w-full">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card
                  key={index}
                  className="border-0 shadow-none hover:shadow-lg bg-transparent transition-all duration-300"
                >
                  <CardHeader className="text-left mb-0">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{info.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-left">
                    <div className="flex flex-col gap-1">
                      {info.content.map((line, i) => (
                        <a
                          key={i}
                          href={
                            i === 0
                              ? info.href
                              : info.icon === Phone
                                ? `tel:${line.replace(/\s/g, "")}`
                                : info.icon === Mail
                                  ? `mailto:${line}`
                                  : info.href
                          }
                          target={info.icon === MapPin ? "_blank" : undefined}
                          rel={
                            info.icon === MapPin
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {line}
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Contact Form Section */}
          <div className="w-full max-w-4xl">
            <Card className="border-0 shadow-none bg-transparent">
              <CardHeader className="text-left">
                <CardTitle className="text-2xl sm:text-3xl">
                  Or fill out the form below
                </CardTitle>
                {successMessage && (
                  <div className="mt-4 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                    <p className="text-green-800 font-medium">
                      {successMessage}
                    </p>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  {/* Name and Email Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Smith"
                        {...form.register("name")}
                        className={`h-12 border-2 border-gray-300 focus:border-primary ${
                          form.formState.errors.name ? "border-destructive" : ""
                        }`}
                      />
                      {form.formState.errors.name && (
                        <p className="text-sm text-destructive">
                          {form.formState.errors.name.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Your Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john.smith@example.com"
                        {...form.register("email")}
                        className={`h-12 border-2 border-gray-300 focus:border-primary ${
                          form.formState.errors.email
                            ? "border-destructive"
                            : ""
                        }`}
                      />
                      {form.formState.errors.email && (
                        <p className="text-sm text-destructive">
                          {form.formState.errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="e.g., EB-1A Visa Consultation"
                      {...form.register("subject")}
                      className={`h-12 border-2 border-gray-300 focus:border-primary ${
                        form.formState.errors.subject
                          ? "border-destructive"
                          : ""
                      }`}
                    />
                    {form.formState.errors.subject && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.subject.message}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your immigration goals, timeline, and any specific questions you have..."
                      rows={10}
                      {...form.register("message")}
                      className={`border-2 border-gray-300 focus:border-primary resize-none min-h-[250px] ${
                        form.formState.errors.message
                          ? "border-destructive"
                          : ""
                      }`}
                    />
                    {form.formState.errors.message && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end pt-4">
                    <Button
                      type="submit"
                      size="lg"
                      className="px-8 gap-2 w-full md:w-1/2 cursor-pointer"
                      disabled={isPending}
                    >
                      <Send className="w-5 h-5" />
                      {isPending ? "Sending Message..." : "Send Message"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ContactPage;
