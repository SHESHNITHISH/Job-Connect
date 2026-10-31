
const searchForm = document.getElementById("jobSearchForm");

searchForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const keyword = document.getElementById("keyword").value.trim();
    const location = document.getElementById("location").value.trim();

    if (keyword === "" && location === "") {
        alert("Please enter a job title or location.");
        return;
    }

    const params = new URLSearchParams({
        keyword: keyword,
        location: location
    });

    window.location.href = "job-listing.html?" + params.toString();

});



// Candidate Registration Form

const candidateForm = document.getElementById("candidateForm");

if (candidateForm) {

    candidateForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const password = document.getElementById("password").value;
        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const resume = document.getElementById("resume").files[0];

        // Check password
        if (password.length < 8) {
            alert("Password must contain at least 8 characters.");
            return;
        }

        // Check password confirmation
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Check resume
        if (!resume || !resume.name.toLowerCase().endsWith(".pdf")) {
            alert("Please upload a PDF resume.");
            return;
        }

        alert("Registration form validated successfully!");

        // Backend integration will be added later.

    });

}


// Recruiter Registration Validation

const recruiterForm = document.getElementById("recruiterForm");

if (recruiterForm) {

    recruiterForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const password =
            document.getElementById("recruiterPassword").value;

        const confirmPassword =
            document.getElementById("recruiterConfirmPassword").value;

        if (password.length < 8) {
            alert("Password must contain at least 8 characters.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        alert("Recruiter registration form validated successfully!");

    });

}



/* =================================
   LOGIN FORM VALIDATION
================================= */

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;

        const role =
            document.getElementById("loginRole").value;

        if (email === "" || password === "" || role === "") {
            alert("Please fill in all fields.");
            return;
        }

        if (password.length < 8) {
            alert("Password must contain at least 8 characters.");
            return;
        }

        alert(
            "Login form validated successfully!\n" +
            "Account Type: " + role
        );

        // Actual login authentication
        // will be connected to Flask API later.

    });

}



// Candidate Profile Form Validation

const profileForm = document.getElementById("profileForm");

if (profileForm) {

    profileForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const resume = document.getElementById("profileResume").files[0];

        if (resume) {

            const isPDF =
                resume.type === "application/pdf" ||
                resume.name.toLowerCase().endsWith(".pdf");

            if (!isPDF) {
                alert("Please upload a PDF resume.");
                return;
            }
        }

        alert("Profile updated successfully!");

        // Actual profile update will be
        // connected to the Flask API later.

    });

}



// Recruiter Profile Form Validation

const recruiterProfileForm =
    document.getElementById("recruiterProfileForm");

if (recruiterProfileForm) {

    recruiterProfileForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const logo =
            document.getElementById("companyLogo").files[0];

        if (logo) {

            const allowedTypes = [
                "image/jpeg",
                "image/png",
                "image/webp"
            ];

            if (!allowedTypes.includes(logo.type)) {
                alert("Please upload JPG, PNG or WEBP company logo.");
                return;
            }
        }

        alert("Company profile updated successfully!");

        // Actual profile saving will be connected
        // to the Flask API later.

    });

}



// =================================
// JOB SEARCH AND FILTER FUNCTION
// =================================

const jobFilterForm = document.getElementById("jobFilterForm");

if (jobFilterForm) {

    const jobCards = document.querySelectorAll(".listing-job-card");
    const jobCount = document.getElementById("jobCount");
    const noJobsMessage = document.getElementById("noJobsMessage");

    function filterJobs() {

        const keyword = document.getElementById("jobKeyword")
            .value.trim().toLowerCase();

        const location = document.getElementById("jobLocation")
            .value.trim().toLowerCase();

        const experience = document.getElementById("jobExperience").value;
        const jobType = document.getElementById("jobType").value;

        let visibleCount = 0;

        jobCards.forEach(function(card) {

            const title = card.dataset.title.toLowerCase();
            const cardLocation = card.dataset.location.toLowerCase();
            const cardExperience = card.dataset.experience;
            const cardType = card.dataset.type;

            const matchesKeyword = title.includes(keyword);
            const matchesLocation = cardLocation.includes(location);
            const matchesExperience =
                !experience || cardExperience === experience;
            const matchesType = !jobType || cardType === jobType;

            const matches =
                matchesKeyword &&
                matchesLocation &&
                matchesExperience &&
                matchesType;

            card.style.display = matches ? "block" : "none";

            if (matches) {
                visibleCount++;
            }

        });

        jobCount.textContent = visibleCount + " Jobs Found";
        noJobsMessage.hidden = visibleCount !== 0;
    }

    jobFilterForm.addEventListener("submit", function(event) {
        event.preventDefault();
        filterJobs();
    });

    document.getElementById("clearJobFilters")
        .addEventListener("click", function() {

            jobFilterForm.reset();
            filterJobs();

        });

    // Read search values passed from the homepage
    const params = new URLSearchParams(window.location.search);

    document.getElementById("jobKeyword").value =
        params.get("keyword") || "";

    document.getElementById("jobLocation").value =
        params.get("location") || "";

    filterJobs();

}

// =================================
// DEMO APPLY BUTTON
// =================================

document.querySelectorAll(".apply-job-btn").forEach(function(button) {

    button.addEventListener("click", function() {

        const jobTitle = button.dataset.job;

        alert(
            "You selected: " + jobTitle +
            "\nActual job application will be connected to Flask later."
        );

    });

});



// POST JOB FORM VALIDATION

const postJobForm = document.getElementById("postJobForm");

if (postJobForm) {
    postJobForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const jobTitle = document.getElementById("jobTitle").value.trim();
        const companyName = document.getElementById("companyName").value.trim();
        const jobLocation = document.getElementById("jobLocation").value.trim();
        const deadline = document.getElementById("deadline").value;

        if (!jobTitle || !companyName || !jobLocation || !deadline) {
            alert("Please complete all required fields.");
            return;
        }

        const selectedDate = new Date(deadline + "T00:00:00");
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            alert("Application deadline cannot be in the past.");
            return;
        }

        alert("Job form validated successfully! Backend integration will be added later.");

        postJobForm.reset();
    });
}

// MY APPLICATIONS STATUS FILTER

const statusFilter = document.getElementById("statusFilter");
const applicationsTableBody = document.getElementById("applicationsTableBody");
const noApplicationsMessage = document.getElementById("noApplicationsMessage");

if (statusFilter && applicationsTableBody) {

    statusFilter.addEventListener("change", function () {

        const selectedStatus = statusFilter.value;
        const rows = applicationsTableBody.querySelectorAll("tr");

        let visibleCount = 0;

        rows.forEach(function (row) {

            const applicationStatus = row.dataset.status;

            if (selectedStatus === "All" ||
                selectedStatus === applicationStatus) {

                row.style.display = "";
                visibleCount++;

            } else {
                row.style.display = "none";
            }
        });

        noApplicationsMessage.hidden = visibleCount !== 0;
    });
}

/* APPLICANTS SEARCH AND STATUS MANAGEMENT */

const applicantsTableBody = document.getElementById("applicantsTableBody");
const applicantSearch = document.getElementById("applicantSearch");
const applicantStatusFilter = document.getElementById("applicantStatusFilter");
const noApplicantsMessage = document.getElementById("noApplicantsMessage");

if (applicantsTableBody) {

    function updateApplicantSummary() {
        const rows = applicantsTableBody.querySelectorAll("tr");

        let pending = 0;
        let shortlisted = 0;
        let rejected = 0;

        rows.forEach(function(row) {
            const status = row.dataset.status;

            if (status === "Pending") pending++;
            if (status === "Shortlisted") shortlisted++;
            if (status === "Rejected") rejected++;
        });

        document.getElementById("applicantTotal").textContent = rows.length;
        document.getElementById("applicantPending").textContent = pending;
        document.getElementById("applicantShortlisted").textContent = shortlisted;
        document.getElementById("applicantRejected").textContent = rejected;
    }

    function filterApplicants() {
        const searchText = applicantSearch.value.toLowerCase().trim();
        const selectedStatus = applicantStatusFilter.value;
        const rows = applicantsTableBody.querySelectorAll("tr");

        let visibleCount = 0;

        rows.forEach(function(row) {
            const rowText = row.textContent.toLowerCase();
            const status = row.dataset.status;

            const matchesSearch = rowText.includes(searchText);
            const matchesStatus =
                selectedStatus === "All" || selectedStatus === status;

            if (matchesSearch && matchesStatus) {
                row.style.display = "";
                visibleCount++;
            } else {
                row.style.display = "none";
            }
        });

        noApplicantsMessage.hidden = visibleCount !== 0;
    }

    applicantsTableBody.addEventListener("change", function(event) {
        if (event.target.classList.contains("update-applicant-status")) {

            const newStatus = event.target.value;
            const row = event.target.closest("tr");

            row.dataset.status = newStatus;

            const statusLabel = row.querySelector(".applicant-status");
            statusLabel.textContent = newStatus;
            statusLabel.className = "applicant-status " + newStatus.toLowerCase();

            updateApplicantSummary();
            filterApplicants();

            alert("Applicant status updated successfully!");
        }
    });

    if (applicantSearch) {
        applicantSearch.addEventListener("input", filterApplicants);
    }

    if (applicantStatusFilter) {
        applicantStatusFilter.addEventListener("change", filterApplicants);
    }

    updateApplicantSummary();
}
