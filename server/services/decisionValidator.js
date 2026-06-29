export const validateDecisions = (decisions) => {

    return decisions.map((decision) => {

        // Clone object
        const validated = { ...decision };

        const title = decision.title.toLowerCase();

        // -----------------------
        // Department Rules
        // -----------------------

        if (
            title.includes("jee") ||
            title.includes("iit") ||
            title.includes("admission") ||
            title.includes("rank")
        ) {

            validated.department = "Academics";

        }

        if (
            title.includes("micromouse") ||
            title.includes("robot")
        ) {

            validated.department = "Technology";

        }

        if (
            title.includes("sponsorship")
        ) {

            validated.department = "Marketing";

        }

        if (
            title.includes("hospitality")
        ) {

            validated.department = "Operations";

        }

        if (
            title.includes("mentor") ||
            title.includes("mentorship")
        ) {

            validated.department = "HR";

        }

        if (
            title.includes("image generator") ||
            title.includes("posture detector") ||
            title.includes("dashboard")
        ) {

            validated.department = "Technology";

        }

        // -----------------------
        // Confidence Adjustment
        // -----------------------

        if (validated.confidence < 0.7) {

            validated.validationStatus = "Needs Review";

        } else {

            validated.validationStatus = "Validated";

        }

        return validated;

    });

};