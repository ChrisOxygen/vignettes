import { redirect } from "next/navigation";

function ApplicationForm() {
  // Redirect to the first form type (Applicant Info)
  redirect("/app/form/applicant-info");
}

export default ApplicationForm;
