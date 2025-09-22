#!/usr/bin/env python3

import requests
import json
import os

# Test the poem generation API
def test_poem_api():
    base_url = "http://localhost:8001/api"

    # Test data
    test_requests = [
        {
            "theme": "ocean waves",
            "style": "haiku",
            "mood": "peaceful",
            "length": "short"
        },
        {
            "theme": "love",
            "style": "sonnet",
            "mood": "romantic",
            "length": "medium"
        },
        {
            "theme": "friendship",
            "style": "free_verse",
            "mood": "happy",
            "length": "medium"
        }
    ]

    print("Testing Poem Generation API")
    print("=" * 50)

    for i, request_data in enumerate(test_requests, 1):
        print(f"\nTest {i}: {request_data['style'].title()} about '{request_data['theme']}'")
        print("-" * 40)

        try:
            # Make API request
            response = requests.post(f"{base_url}/generate-poem", json=request_data, timeout=30)

            print(f"Status Code: {response.status_code}")

            if response.status_code == 200:
                result = response.json()

                if result.get("success"):
                    print("✅ SUCCESS!")
                    print(f"Theme: {result['theme']}")
                    print(f"Style: {result['style']}")
                    print(f"Mood: {result['mood']}")
                    print("\nGenerated Poem:")
                    print("📝 " + "="*30)
                    print(result['poem'])
                    print("="*34)

                    # Print metadata if available
                    if result.get('metadata'):
                        print(f"\nMetadata: {result['metadata']}")
                else:
                    print("❌ API returned success=False")
                    print(f"Error: {result.get('error', 'Unknown error')}")
            else:
                print(f"❌ HTTP Error: {response.status_code}")
                try:
                    error_data = response.json()
                    print(f"Error details: {error_data}")
                except:
                    print(f"Response text: {response.text}")

        except requests.exceptions.RequestException as e:
            print(f"❌ Request failed: {e}")
        except Exception as e:
            print(f"❌ Unexpected error: {e}")

        print("\n" + "="*50)

# Test basic API health
def test_api_health():
    base_url = "http://localhost:8001/api"

    print("Testing API Health")
    print("=" * 30)

    try:
        response = requests.get(f"{base_url}/", timeout=5)
        print(f"Status Code: {response.status_code}")

        if response.status_code == 200:
            result = response.json()
            print(f"✅ API is healthy: {result}")
        else:
            print(f"❌ API health check failed: {response.text}")

    except requests.exceptions.RequestException as e:
        print(f"❌ Failed to connect to API: {e}")
        print("Make sure the backend server is running on port 8001")

if __name__ == "__main__":
    # Test API health first
    test_api_health()
    print()

    # Test poem generation
    test_poem_api()