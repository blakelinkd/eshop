import os
from transformers import pipeline
from tqdm import tqdm
from gitignore_parser import parse_gitignore


def summarize_project_files(path: str, num_sentences: int) -> str:
    """
    Summarizes the project files by extracting the most relevant sentences.
    """
    # Load the textual contents of all relevant files in the project directory
    files = []
    gitignore = parse_gitignore(os.path.join(path, ".gitignore"))
    for root, dirs, filenames in os.walk(path):
        # Filter out directories and files that match patterns in the .gitignore file
        dirs[:] = [d for d in dirs if not gitignore(os.path.join(root, d))]
        filenames = [f for f in filenames if not gitignore(os.path.join(root, f))]
        for filename in filenames:
            if filename.endswith((".html", ".jsx", ".ts", ".tsx", ".md")):
                filepath = os.path.join(root, filename)
                with open(filepath, "r", encoding="utf-8") as file:
                    content = file.read()
                    files.append(content)
                    if len(files) >= 100:
                        # Use the Transformers library to extract the most relevant sentences
                        summarizer = pipeline("summarization")
                        text = "\n".join(files)
                        summary = summarizer(text, max_length=512, min_length=1)

                        # Join the summarized sentences into a single string
                        summarized_text = "\n".join(summary[0]["summary_text"].split("\n")[:num_sentences])
                        print(summarized_text)

                        files = []

    if len(files) > 0:
        # Use the Transformers library to extract the most relevant sentences for the remaining files
        summarizer = pipeline("summarization")
        text = "\n".join(files)
        summary = summarizer(text, max_length=12, min_length=1)

        # Join the summarized sentences into a single string
        summarized_text = "\n".join(summary[0]["summary_text"].split("\n")[:num_sentences])
        print(summarized_text)

    return summarized_text


if __name__ == "__main__":
    path = "./"
    num_sentences = 5
    summary = summarize_project_files(path, num_sentences)
    print(summary)
