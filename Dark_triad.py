import random

# Dark Triad Personality Self-Assessment
# Traits: Machiavellianism, Narcissism, Psychopathy
# 1 = Strongly Disagree, 5 = Strongly Agree
# Not a clinical diagnosis.

def ask_rating(question):
    while True:
        try:
            answer = int(input(question + " (1-5): "))
            if 1 <= answer <= 5:
                return answer
            print("Please enter a number from 1 to 5.")
        except ValueError:
            print("Please enter a valid number.")


def reverse_score(score):
    return 6 - score


def interpret_score(score):
    if score < 2.5:
        return "Low"
    elif score < 3.5:
        return "Moderate"
    return "High"


def dark_triad_test():
    print("\nDark Triad Personality Self-Assessment")
    print("1 = Strongly Disagree, 5 = Strongly Agree\n")

    name = input("Enter name or initials: ").strip()

    questions = [
        # Machiavellianism
        ("It is wise to keep useful information to yourself.", "Machiavellianism", False),
        ("I can persuade people to do what I want.", "Machiavellianism", False),
        ("I avoid manipulating people, even when it would benefit me.", "Machiavellianism", True),
        ("I believe strategy is more important than honesty in some situations.", "Machiavellianism", False),
        ("I sometimes flatter people to get what I want.", "Machiavellianism", False),
        ("I prefer being fully honest rather than being strategic with people.", "Machiavellianism", True),

        # Narcissism
        ("I like being admired by others.", "Narcissism", False),
        ("I believe I have qualities that make me stand out.", "Narcissism", False),
        ("I enjoy receiving attention.", "Narcissism", False),
        ("I rarely feel the need to impress people.", "Narcissism", True),
        ("I think I deserve special recognition when I do well.", "Narcissism", False),
        ("I am comfortable not being noticed.", "Narcissism", True),

        # Psychopathy
        ("I can stay calm even when others are upset.", "Psychopathy", False),
        ("I sometimes take risks without thinking much about the consequences.", "Psychopathy", False),
        ("I do not feel guilty easily.", "Psychopathy", False),
        ("I usually think carefully before doing something risky.", "Psychopathy", True),
        ("I can be emotionally detached in difficult situations.", "Psychopathy", False),
        ("I feel bad when my actions hurt someone.", "Psychopathy", True),
    ]

    random.shuffle(questions)

    scores = {
        "Machiavellianism": [],
        "Narcissism": [],
        "Psychopathy": [],
    }

    print("\nAnswer honestly. The categories will be shown after the test.\n")

    for index, (question, trait, reverse) in enumerate(questions, start=1):
        score = ask_rating(f"{index}. {question}")

        if reverse:
            score = reverse_score(score)

        scores[trait].append(score)

    print("\n--- Dark Triad Results ---")
    print(f"Name: {name}\n")

    for trait, trait_scores in scores.items():
        average = sum(trait_scores) / len(trait_scores)
        level = interpret_score(average)
        print(f"{trait}: {average:.2f}/5 - {level}")

    print("\n--- What the Dark Triad Traits Mean ---")
    print("""
Machiavellianism:
A tendency toward strategic thinking, manipulation, emotional distance, and focusing on personal advantage.

Narcissism:
A tendency toward high self-importance, desire for admiration, confidence, attention-seeking, or feeling deserving of recognition.

Psychopathy:
A tendency toward impulsiveness, low fear, emotional detachment, risk-taking, and reduced guilt or empathy.

Important:
This is a simple workplace/self-reflection tool, not a medical or psychological diagnosis.
Use the results carefully and avoid labeling people unfairly.
""")


dark_triad_test()