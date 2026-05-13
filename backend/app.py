from flask import Flask, request, jsonify
from flask_cors import CORS
from newspaper import Article
from groq import Groq
import json
import os

app = Flask(__name__)
CORS(app)

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

@app.route("/")
def home():
    return "Crime Lens AI Backend Running 🚀"

@app.route("/analyze", methods=["POST"])
def analyze():

    data = request.json
    url = data.get("url")

    article = Article(url)
    article.download()
    article.parse()

    text = article.text

    if len(text) > 4000:
        text = text[:4000]

    prompt = f"""
Analyze this crime news article and return ONLY valid JSON.

Format:
{{
    "crime_type": "",
    "location": "",
    "suspects": "",
    "risk_level": "",
    "date": "",
    "summary": ""
}}

Article:
{text}
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    ai_result = response.choices[0].message.content

    cleaned = ai_result.replace("```json", "").replace("```", "").strip()

    result_json = json.loads(cleaned)

    return jsonify(result_json)

if __name__ == "__main__":
    app.run(debug=True)