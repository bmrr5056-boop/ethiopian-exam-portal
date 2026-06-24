import json
import os

# ለማትሪክስ የሚያስፈልጉ ዋና ዋና የትምህርት ዓይነቶች ዝርዝር
valid_subjects = ["English", "Mathematics", "Physics", "Chemistry", "Biology", "Geography", "History", "Civics", "Aptitude", "Economics"]

def load_existing_questions():
    if os.path.exists('questions.json'):
        try:
            with open('questions.json', 'r', encoding='utf-8') as f:
                return json.load(f)
        except:
            return []
    return []

def add_bulk_questions():
    questions = load_existing_questions()
    
    # ቀጣዩን የጥያቄ ID ለመወሰን
    current_id = max([q['id'] for q in questions]) + 1 if questions else 1
    
    print("=== የ9-12ኛ ክፍል ማትሪክስ ጥያቄዎች ማድረጊያ ===")
    print(f"የተመረጡ የትምህርት ዓይነቶች: {', '.join(valid_subjects)}")
    
    grade = int(input("ክፍል ያስገቡ (9, 10, 11, 12): "))
    subject = input("የትምህርት ዓይነት (ለምሳሌ Physics): ").strip()
    
    if subject not in valid_subjects:
        print("ስህተት: ይህ የትምህርት ዓይነት ለማትሪክስ አይፈለግም!")
        return

    num_questions = int(input("ስንት ጥያቄዎች ማስገባት ይፈልጋሉ?: "))
    
    for i in range(num_questions):
        print(f"\n--- ጥያቄ {i+1} ---")
        question_text = input("ጥያቄውን ይጻፉ: ")
        
        options = []
        for letter in ['A', 'B', 'C', 'D']:
            opt = input(f"ምርጫ {letter}: ")
            options.append(opt)
            
        answer = input("ትክክለኛውን መልስ ሙሉ ጽሑፍ ያስገቡ (ከምርጫዎቹ ውስጥ አንዱን): ")
        explanation = input("የመልሱ ማብራሪያ (የማይፈልጉ ከሆነ ዝም ብለው Enter ይበሉ): ")
        
        new_q = {
            "id": current_id,
            "grade": grade,
            "subject": subject,
            "question": question_text,
            "options": options,
            "answer": answer,
            "explanation": explanation if explanation else "No explanation provided."
        }
        
        questions.append(new_q)
        current_id += 1
        
    with open('questions.json', 'w', encoding='utf-8') as f:
        json.dump(questions, f, indent=2, ensure_ascii=False)
        
    print(f"\n✅ {num_questions} ጥያቄዎች በተሳካ ሁኔታ ወደ ዳታቤዝ ተጨምረዋል!")

if __name__ == "__main__":
    add_bulk_questions()
