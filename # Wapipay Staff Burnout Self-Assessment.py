# Wapipay Staff Burnout Self-Assessment
# This is not a medical diagnosis. It is a workplace wellbeing screening tool.

def ask_yes_no(question):
    while True:
        answer = input(question + " (yes/no): ").strip().lower()
        if answer in ["yes", "y"]:
            return 1
        elif answer in ["no", "n"]:
            return 0
        else:
            print("Please answer yes or no.")


def ask_rating(question):
    while True:
        try:
            rating = int(input(question + " (1-5): "))
            if 1 <= rating <= 5:
                return rating
            else:
                print("Please enter a number from 1 to 5.")
        except ValueError:
            print("Please enter a valid number.")


def burnout_assessment():
    print("\nWapipay Staff Burnout Self-Assessment")
    print("Scale: 1 = Never/Very Low, 5 = Always/Very High\n")

    name = input("Staff member name or initials: ").strip()
    department = input("Department or team: ").strip()

    rating_questions = [
        "How emotionally drained do you feel after work?",
        "How often do you feel overwhelmed by your workload?",
        "How often do you struggle to concentrate at work?",
        "How often do you feel physically tired during the workday?",
        "How often do you feel disconnected from your work?",
        "How often do you feel under pressure to meet deadlines?",
        "How often do you find it hard to recover after work?",
        "How often do you feel your work-life balance is poor?",
        "How often do you feel unsupported at work?",
        "How often do you feel your effort is not recognized?"
    ]

    yes_no_questions = [
        "Have you recently considered taking sick leave because of stress?",
        "Have you been losing sleep because of work?",
        "Have you become more irritable with colleagues or clients?",
        "Have you noticed a drop in your motivation?",
        "Have you felt like quitting or changing roles due to stress?"
    ]

    rating_score = 0
    for q in rating_questions:
        rating_score += ask_rating(q)

    yes_no_score = 0
    for q in yes_no_questions:
        yes_no_score += ask_yes_no(q)

    total_score = rating_score + (yes_no_score * 3)
    max_score = 50 + 15

    percentage = (total_score / max_score) * 100

    print("\n--- Assessment Result ---")
    print(f"Staff: {name}")
    print(f"Department: {department}")
    print(f"Total Score: {total_score}/{max_score}")
    print(f"Burnout Risk: {percentage:.1f}%")

    if percentage < 35:
        level = "Low"
        advice = "Maintain healthy routines and regular check-ins."
    elif percentage < 65:
        level = "Moderate"
        advice = "Consider workload review, rest, and manager support."
    else:
        level = "High"
        advice = "Recommend immediate support discussion with HR/manager and time to recover."

    print(f"Risk Level: {level}")
    print(f"Suggested Action: {advice}")

    print("\nNote: This tool is for internal wellbeing screening only and is not a medical diagnosis.")


burnout_assessment()