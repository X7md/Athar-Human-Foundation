import sys
import os

def process_astro_file(filepath):
    """
    Reads an Astro file, extracts content between frontmatter delimiters,
    and prints it.
    """
    try:
        with open(filepath, 'r') as f:
            lines = f.readlines()

        start_delimiter = '---\n'
        end_delimiter = '---\n'

        start_index = -1
        end_index = -1

        for i, line in enumerate(lines):
            if line == start_delimiter and start_index == -1:
                start_index = i
            elif line == end_delimiter and start_index != -1 and i > start_index:
                end_index = i
                break

        if start_index != -1 and end_index != -1:
            content_lines = lines[start_index + 1:end_index]
            content = ''.join(content_lines)
            print(content, end='') # Ensure no extra newlines are added.

    except FileNotFoundError:
        print(f"Error: File not found: {filepath}", file=sys.stderr)
    except Exception as e:
        print(f"Error processing {filepath}: {e}", file=sys.stderr)

if __name__ == "__main__":
    if len(sys.argv) > 1:
        filepath = sys.argv[1]
        process_astro_file(filepath)
    else:
        print("Usage: python script.py <filepath>", file=sys.stderr)
