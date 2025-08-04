from flask import Flask, request, jsonify
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd

# Initialize the Flask app
app = Flask(__name__)

@app.route("/")
def home():
    return "AI Recommendation API is running!"



@app.route('/recommend-projects', methods=['POST'])
def recommend_projects():
    data = request.get_json()
    target_user = data.get('target_user')
    projects = data.get('projects')

    if not target_user or not projects:
        return jsonify({"error": "Missing target_user or projects"}), 400

    projects_df = pd.DataFrame(projects)

    projects_df['combined_text'] = (
        projects_df['techStack'].apply(lambda x: ' '.join(map(str, x or []))) + ' ' +
        projects_df['tags'].apply(lambda x: ' '.join(map(str, x or [])))
    )

    vectorizer = TfidfVectorizer(stop_words='english')
    project_vectors = vectorizer.fit_transform(projects_df['combined_text'])

    skills = target_user.get('skills', []) or []
    interests = target_user.get('interests', []) or []
    user_text = ' '.join(map(str, skills + interests))
    user_vector = vectorizer.transform([user_text])

    similarities = cosine_similarity(user_vector, project_vectors).flatten()
    projects_df['similarity'] = similarities

    recommended_projects = projects_df[projects_df['similarity'] >= 0.0].sort_values(by='similarity', ascending=False)
    recommendations = recommended_projects[['_id', 'similarity']].head(10).to_dict('records')
  
    return jsonify(recommendations)


@app.route("/recommend-users", methods=["POST"])
def recommend_users():
    data = request.get_json()
    users = data.get("users")
    target_project = data.get("target_project")

    if not users or not target_project:
        return jsonify({"error": "Missing users or target_project"}), 400

    users_df = pd.DataFrame(users)

    users_df["combined_text"] = (
        users_df["skills"].apply(lambda x: " ".join(x or [])) + " " +
        users_df["interests"].apply(lambda x: " ".join(x or []))
    )


    tech_stack = target_project.get("techStack", []) or []
    tags = target_project.get("tags", []) or []
    project_text = " ".join(tech_stack + tags)

    vectorizer = TfidfVectorizer(stop_words="english")
    user_vectors = vectorizer.fit_transform(users_df["combined_text"])
    project_vector = vectorizer.transform([project_text])

    similarities = cosine_similarity(project_vector, user_vectors).flatten()
    users_df["similarity"] = similarities

    recommended_users = users_df[users_df["similarity"] >= 0.0].sort_values(by="similarity", ascending=False)
    recommendations = recommended_users[["_id", "similarity"]].head(10).to_dict("records")

    return jsonify(recommendations)


if __name__ == '__main__':
    app.run(port=5001, debug=True)
