import random

# Big Five Personality Test
# 1 = Strongly Disagree, 5 = Strongly Agree

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


def big_five_test():
    print("\nBig Five Personality Test")
    print("1 = Strongly Disagree, 5 = Strongly Agree\n")

    name = input("Enter name or initials: ").strip()

    questions = [
        # Openness
        ("I enjoy trying new ideas and experiences.", "Openness", False),
        ("I have a vivid imagination.", "Openness", False),
        ("I prefer routine over new experiences.", "Openness", True),
        ("I enjoy learning about abstract or complex topics.", "Openness", False),
        ("I am curious about many different things.", "Openness", False),
        ("I enjoy creative activities such as writing, music, or design.", "Openness", False),

        # Conscientiousness
        ("I am organized and prepared.", "Conscientiousness", False),
        ("I pay attention to details.", "Conscientiousness", False),
        ("I often leave tasks unfinished.", "Conscientiousness", True),
        ("I follow through on my commitments.", "Conscientiousness", False),
        ("I plan my work before starting.", "Conscientiousness", False),
        ("I get distracted easily when working on important tasks.", "Conscientiousness", True),

        # Extraversion
        ("I feel energized around other people.", "Extraversion", False),
        ("I enjoy being the center of attention.", "Extraversion", False),
        ("I prefer to stay quiet in groups.", "Extraversion", True),
        ("I start conversations easily.", "Extraversion", False),
        ("I enjoy meeting new people.", "Extraversion", False),
        ("I prefer working alone most of the time.", "Extraversion", True),

        # Agreeableness
        ("I am considerate of other people's feelings.", "Agreeableness", False),
        ("I like helping others.", "Agreeableness", False),
        ("I can be critical or harsh toward others.", "Agreeableness", True),
        ("I try to avoid unnecessary conflict.", "Agreeableness", False),
        ("I trust people’s intentions unless given a reason not to.", "Agreeableness", False),
        ("I find it easy to cooperate with different personalities.", "Agreeableness", False),

        # Neuroticism
        ("I get stressed easily.", "Neuroticism", False),
        ("I worry about many things.", "Neuroticism", False),
        ("I stay calm under pressure.", "Neuroticism", True),
        ("My mood changes easily.", "Neuroticism", False),
        ("I often feel tense or anxious.", "Neuroticism", False),
        ("I recover quickly after stressful situations.", "Neuroticism", True),
    ]

    random.shuffle(questions)

    scores = {
        "Openness": [],
        "Conscientiousness": [],
        "Extraversion": [],
        "Agreeableness": [],
        "Neuroticism": [],
    }

    print("\nAnswer the following questions honestly.")
    print("The categories will only be shown after the test.\n")

    for index, (question, trait, reverse) in enumerate(questions, start=1):
        score = ask_rating(f"{index}. {question}")

        if reverse:
            score = reverse_score(score)

        scores[trait].append(score)

    print("\n--- Big Five Personality Results ---")
    print(f"Name: {name}\n")

    for trait, trait_scores in scores.items():
        average = sum(trait_scores) / len(trait_scores)

        if average < 2.5:
            level = "Low"
        elif average < 3.5:
            level = "Moderate"
        else:
            level = "High"

        print(f"{trait}: {average:.2f}/5 - {level}")

    print("\nNote: This is a simple self-assessment tool, not a clinical diagnosis.")


big_five_test()