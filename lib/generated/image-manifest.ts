export type ImageVariant = {
  src: string;
  width: number;
  height: number;
};

export type ImageManifestEntry = {
  original: ImageVariant;
  fallback: {
    format: "jpg" | "png";
    variants: ImageVariant[];
  };
  webp: ImageVariant[];
  avif: ImageVariant[];
  hasAlpha: boolean;
};

export const imageManifest: Record<string, ImageManifestEntry> = {
  "/images/posts/ai-and-software-engineering-more-than-just-coding.png": {
    "original": {
      "src": "/images/posts/ai-and-software-engineering-more-than-just-coding.png",
      "width": 1536,
      "height": 1024
    },
    "fallback": {
      "format": "jpg",
      "variants": [
        {
          "src": "/images/generated/posts/ai-and-software-engineering-more-than-just-coding-480.jpg",
          "width": 480,
          "height": 320
        },
        {
          "src": "/images/generated/posts/ai-and-software-engineering-more-than-just-coding-768.jpg",
          "width": 768,
          "height": 512
        },
        {
          "src": "/images/generated/posts/ai-and-software-engineering-more-than-just-coding-1024.jpg",
          "width": 1024,
          "height": 683
        },
        {
          "src": "/images/generated/posts/ai-and-software-engineering-more-than-just-coding-1280.jpg",
          "width": 1280,
          "height": 853
        }
      ]
    },
    "webp": [
      {
        "src": "/images/generated/posts/ai-and-software-engineering-more-than-just-coding-480.webp",
        "width": 480,
        "height": 320
      },
      {
        "src": "/images/generated/posts/ai-and-software-engineering-more-than-just-coding-768.webp",
        "width": 768,
        "height": 512
      },
      {
        "src": "/images/generated/posts/ai-and-software-engineering-more-than-just-coding-1024.webp",
        "width": 1024,
        "height": 683
      },
      {
        "src": "/images/generated/posts/ai-and-software-engineering-more-than-just-coding-1280.webp",
        "width": 1280,
        "height": 853
      }
    ],
    "avif": [
      {
        "src": "/images/generated/posts/ai-and-software-engineering-more-than-just-coding-480.avif",
        "width": 480,
        "height": 320
      },
      {
        "src": "/images/generated/posts/ai-and-software-engineering-more-than-just-coding-768.avif",
        "width": 768,
        "height": 512
      },
      {
        "src": "/images/generated/posts/ai-and-software-engineering-more-than-just-coding-1024.avif",
        "width": 1024,
        "height": 683
      },
      {
        "src": "/images/generated/posts/ai-and-software-engineering-more-than-just-coding-1280.avif",
        "width": 1280,
        "height": 853
      }
    ],
    "hasAlpha": false
  },
  "/images/posts/demystifying-ai-in-engineering.png": {
    "original": {
      "src": "/images/posts/demystifying-ai-in-engineering.png",
      "width": 1536,
      "height": 1024
    },
    "fallback": {
      "format": "jpg",
      "variants": [
        {
          "src": "/images/generated/posts/demystifying-ai-in-engineering-480.jpg",
          "width": 480,
          "height": 320
        },
        {
          "src": "/images/generated/posts/demystifying-ai-in-engineering-768.jpg",
          "width": 768,
          "height": 512
        },
        {
          "src": "/images/generated/posts/demystifying-ai-in-engineering-1024.jpg",
          "width": 1024,
          "height": 683
        },
        {
          "src": "/images/generated/posts/demystifying-ai-in-engineering-1280.jpg",
          "width": 1280,
          "height": 853
        }
      ]
    },
    "webp": [
      {
        "src": "/images/generated/posts/demystifying-ai-in-engineering-480.webp",
        "width": 480,
        "height": 320
      },
      {
        "src": "/images/generated/posts/demystifying-ai-in-engineering-768.webp",
        "width": 768,
        "height": 512
      },
      {
        "src": "/images/generated/posts/demystifying-ai-in-engineering-1024.webp",
        "width": 1024,
        "height": 683
      },
      {
        "src": "/images/generated/posts/demystifying-ai-in-engineering-1280.webp",
        "width": 1280,
        "height": 853
      }
    ],
    "avif": [
      {
        "src": "/images/generated/posts/demystifying-ai-in-engineering-480.avif",
        "width": 480,
        "height": 320
      },
      {
        "src": "/images/generated/posts/demystifying-ai-in-engineering-768.avif",
        "width": 768,
        "height": 512
      },
      {
        "src": "/images/generated/posts/demystifying-ai-in-engineering-1024.avif",
        "width": 1024,
        "height": 683
      },
      {
        "src": "/images/generated/posts/demystifying-ai-in-engineering-1280.avif",
        "width": 1280,
        "height": 853
      }
    ],
    "hasAlpha": false
  },
  "/images/posts/the-most-dangerous-thing-ai-gives-engineers-false-confidence.png": {
    "original": {
      "src": "/images/posts/the-most-dangerous-thing-ai-gives-engineers-false-confidence.png",
      "width": 1536,
      "height": 1024
    },
    "fallback": {
      "format": "jpg",
      "variants": [
        {
          "src": "/images/generated/posts/the-most-dangerous-thing-ai-gives-engineers-false-confidence-480.jpg",
          "width": 480,
          "height": 320
        },
        {
          "src": "/images/generated/posts/the-most-dangerous-thing-ai-gives-engineers-false-confidence-768.jpg",
          "width": 768,
          "height": 512
        },
        {
          "src": "/images/generated/posts/the-most-dangerous-thing-ai-gives-engineers-false-confidence-1024.jpg",
          "width": 1024,
          "height": 683
        },
        {
          "src": "/images/generated/posts/the-most-dangerous-thing-ai-gives-engineers-false-confidence-1280.jpg",
          "width": 1280,
          "height": 853
        }
      ]
    },
    "webp": [
      {
        "src": "/images/generated/posts/the-most-dangerous-thing-ai-gives-engineers-false-confidence-480.webp",
        "width": 480,
        "height": 320
      },
      {
        "src": "/images/generated/posts/the-most-dangerous-thing-ai-gives-engineers-false-confidence-768.webp",
        "width": 768,
        "height": 512
      },
      {
        "src": "/images/generated/posts/the-most-dangerous-thing-ai-gives-engineers-false-confidence-1024.webp",
        "width": 1024,
        "height": 683
      },
      {
        "src": "/images/generated/posts/the-most-dangerous-thing-ai-gives-engineers-false-confidence-1280.webp",
        "width": 1280,
        "height": 853
      }
    ],
    "avif": [
      {
        "src": "/images/generated/posts/the-most-dangerous-thing-ai-gives-engineers-false-confidence-480.avif",
        "width": 480,
        "height": 320
      },
      {
        "src": "/images/generated/posts/the-most-dangerous-thing-ai-gives-engineers-false-confidence-768.avif",
        "width": 768,
        "height": 512
      },
      {
        "src": "/images/generated/posts/the-most-dangerous-thing-ai-gives-engineers-false-confidence-1024.avif",
        "width": 1024,
        "height": 683
      },
      {
        "src": "/images/generated/posts/the-most-dangerous-thing-ai-gives-engineers-false-confidence-1280.avif",
        "width": 1280,
        "height": 853
      }
    ],
    "hasAlpha": false
  },
  "/images/posts/using-ai-in-personal-projects-vs-enterprise-codebases.png": {
    "original": {
      "src": "/images/posts/using-ai-in-personal-projects-vs-enterprise-codebases.png",
      "width": 1536,
      "height": 1024
    },
    "fallback": {
      "format": "jpg",
      "variants": [
        {
          "src": "/images/generated/posts/using-ai-in-personal-projects-vs-enterprise-codebases-480.jpg",
          "width": 480,
          "height": 320
        },
        {
          "src": "/images/generated/posts/using-ai-in-personal-projects-vs-enterprise-codebases-768.jpg",
          "width": 768,
          "height": 512
        },
        {
          "src": "/images/generated/posts/using-ai-in-personal-projects-vs-enterprise-codebases-1024.jpg",
          "width": 1024,
          "height": 683
        },
        {
          "src": "/images/generated/posts/using-ai-in-personal-projects-vs-enterprise-codebases-1280.jpg",
          "width": 1280,
          "height": 853
        }
      ]
    },
    "webp": [
      {
        "src": "/images/generated/posts/using-ai-in-personal-projects-vs-enterprise-codebases-480.webp",
        "width": 480,
        "height": 320
      },
      {
        "src": "/images/generated/posts/using-ai-in-personal-projects-vs-enterprise-codebases-768.webp",
        "width": 768,
        "height": 512
      },
      {
        "src": "/images/generated/posts/using-ai-in-personal-projects-vs-enterprise-codebases-1024.webp",
        "width": 1024,
        "height": 683
      },
      {
        "src": "/images/generated/posts/using-ai-in-personal-projects-vs-enterprise-codebases-1280.webp",
        "width": 1280,
        "height": 853
      }
    ],
    "avif": [
      {
        "src": "/images/generated/posts/using-ai-in-personal-projects-vs-enterprise-codebases-480.avif",
        "width": 480,
        "height": 320
      },
      {
        "src": "/images/generated/posts/using-ai-in-personal-projects-vs-enterprise-codebases-768.avif",
        "width": 768,
        "height": 512
      },
      {
        "src": "/images/generated/posts/using-ai-in-personal-projects-vs-enterprise-codebases-1024.avif",
        "width": 1024,
        "height": 683
      },
      {
        "src": "/images/generated/posts/using-ai-in-personal-projects-vs-enterprise-codebases-1280.avif",
        "width": 1280,
        "height": 853
      }
    ],
    "hasAlpha": false
  },
  "/images/posts/you-are-a-mostly-helpful-assistant.png": {
    "original": {
      "src": "/images/posts/you-are-a-mostly-helpful-assistant.png",
      "width": 1536,
      "height": 1024
    },
    "fallback": {
      "format": "jpg",
      "variants": [
        {
          "src": "/images/generated/posts/you-are-a-mostly-helpful-assistant-480.jpg",
          "width": 480,
          "height": 320
        },
        {
          "src": "/images/generated/posts/you-are-a-mostly-helpful-assistant-768.jpg",
          "width": 768,
          "height": 512
        },
        {
          "src": "/images/generated/posts/you-are-a-mostly-helpful-assistant-1024.jpg",
          "width": 1024,
          "height": 683
        },
        {
          "src": "/images/generated/posts/you-are-a-mostly-helpful-assistant-1280.jpg",
          "width": 1280,
          "height": 853
        }
      ]
    },
    "webp": [
      {
        "src": "/images/generated/posts/you-are-a-mostly-helpful-assistant-480.webp",
        "width": 480,
        "height": 320
      },
      {
        "src": "/images/generated/posts/you-are-a-mostly-helpful-assistant-768.webp",
        "width": 768,
        "height": 512
      },
      {
        "src": "/images/generated/posts/you-are-a-mostly-helpful-assistant-1024.webp",
        "width": 1024,
        "height": 683
      },
      {
        "src": "/images/generated/posts/you-are-a-mostly-helpful-assistant-1280.webp",
        "width": 1280,
        "height": 853
      }
    ],
    "avif": [
      {
        "src": "/images/generated/posts/you-are-a-mostly-helpful-assistant-480.avif",
        "width": 480,
        "height": 320
      },
      {
        "src": "/images/generated/posts/you-are-a-mostly-helpful-assistant-768.avif",
        "width": 768,
        "height": 512
      },
      {
        "src": "/images/generated/posts/you-are-a-mostly-helpful-assistant-1024.avif",
        "width": 1024,
        "height": 683
      },
      {
        "src": "/images/generated/posts/you-are-a-mostly-helpful-assistant-1280.avif",
        "width": 1280,
        "height": 853
      }
    ],
    "hasAlpha": false
  },
  "/jvw_headshot.jpg": {
    "original": {
      "src": "/jvw_headshot.jpg",
      "width": 2734,
      "height": 2542
    },
    "fallback": {
      "format": "jpg",
      "variants": [
        {
          "src": "/generated/jvw_headshot-480.jpg",
          "width": 480,
          "height": 446
        },
        {
          "src": "/generated/jvw_headshot-768.jpg",
          "width": 768,
          "height": 714
        },
        {
          "src": "/generated/jvw_headshot-1024.jpg",
          "width": 1024,
          "height": 952
        },
        {
          "src": "/generated/jvw_headshot-1280.jpg",
          "width": 1280,
          "height": 1190
        },
        {
          "src": "/generated/jvw_headshot-1600.jpg",
          "width": 1600,
          "height": 1488
        }
      ]
    },
    "webp": [
      {
        "src": "/generated/jvw_headshot-480.webp",
        "width": 480,
        "height": 446
      },
      {
        "src": "/generated/jvw_headshot-768.webp",
        "width": 768,
        "height": 714
      },
      {
        "src": "/generated/jvw_headshot-1024.webp",
        "width": 1024,
        "height": 952
      },
      {
        "src": "/generated/jvw_headshot-1280.webp",
        "width": 1280,
        "height": 1190
      },
      {
        "src": "/generated/jvw_headshot-1600.webp",
        "width": 1600,
        "height": 1488
      }
    ],
    "avif": [
      {
        "src": "/generated/jvw_headshot-480.avif",
        "width": 480,
        "height": 446
      },
      {
        "src": "/generated/jvw_headshot-768.avif",
        "width": 768,
        "height": 714
      },
      {
        "src": "/generated/jvw_headshot-1024.avif",
        "width": 1024,
        "height": 952
      },
      {
        "src": "/generated/jvw_headshot-1280.avif",
        "width": 1280,
        "height": 1190
      },
      {
        "src": "/generated/jvw_headshot-1600.avif",
        "width": 1600,
        "height": 1488
      }
    ],
    "hasAlpha": false
  }
};
