lessonContent["en"] = {
  "equipment": {
    "version": 1,
    "title": "Prepare your laboratory bench",
    "goal": "Recognise basic equipment and choose a safe order for preparing your workspace.",
    "sections": [
      {
        "title": "Start with the task and safety",
        "paragraphs": [
          "Read the task and listen to your teacher before starting. Work in a real laboratory only under their supervision. Never taste substances or use unfamiliar materials on your own.",
          "In this learning model, select safety goggles and a lab coat before working. Your teacher determines the exact protective equipment and rules for a real activity. A virtual experiment does not replace their instructions."
        ]
      },
      {
        "title": "Each item has a purpose",
        "paragraphs": [
          "A laboratory beaker holds liquids and is used for mixing. A test tube holds small amounts of a substance. Place test tubes in a test-tube rack to keep them from falling.",
          "A stirring rod is used for stirring and guiding liquid when pouring. A funnel helps transfer liquids and, with a suitable filter, is used for filtration. A stirring rod does not measure volume."
        ]
      },
      {
        "title": "Make the workspace stable",
        "paragraphs": [
          "Place equipment in the designated areas and the test tube in its rack. Keep items away from the edge of the bench. Independent items may be placed in different orders, but a test tube needs its support first.",
          "This introductory activity explores equipment: it does not mix substances or perform a reaction. After recording observations, tidy up as your teacher instructs. The model cleanup is not a guide to disposing of substances."
        ]
      }
    ],
    "glossary": [
      {
        "term": "Laboratory beaker",
        "definition": "A vessel for holding liquids and mixing."
      },
      {
        "term": "Test tube",
        "definition": "A vessel for working with small amounts of substances."
      },
      {
        "term": "Test-tube rack",
        "definition": "A support that holds test tubes."
      },
      {
        "term": "Stirring rod",
        "definition": "A tool for stirring, not for measuring."
      }
    ],
    "questions": [
      {
        "id": "prepare",
        "prompt": "What should you do before starting?",
        "correct": "read",
        "options": [
          {
            "id": "guess",
            "label": "Start mixing substances immediately",
            "feedback": "First learn the task and the rules. Arbitrary mixing is not part of this activity."
          },
          {
            "id": "read",
            "label": "Read the task and prepare protective equipment",
            "feedback": "Correct: learn the rules first, then prepare your protection and workspace."
          },
          {
            "id": "taste",
            "label": "Taste the substance to identify it",
            "feedback": "Never taste laboratory substances. Read the task and prepare protective equipment first."
          }
        ]
      },
      {
        "id": "support",
        "prompt": "Where can a test tube be held securely?",
        "correct": "rack",
        "options": [
          {
            "id": "rack",
            "label": "In a test-tube rack",
            "feedback": "Correct: the rack supports the tube and helps prevent it from falling."
          },
          {
            "id": "edge",
            "label": "At the edge of the bench without support",
            "feedback": "A tube can fall from the edge. It needs a test-tube rack."
          },
          {
            "id": "rod",
            "label": "On a stirring rod",
            "feedback": "A stirring rod does not support a test tube. Use a rack."
          }
        ]
      }
    ]
  },
  "dissolving": {
    "version": 1,
    "title": "How salt dissolves in water",
    "goal": "Observe dissolving and explain that the solution contains water and salt.",
    "sections": [
      {
        "title": "Substances and a mixture",
        "paragraphs": [
          "The model uses water without impurities and table salt as its starting substances. Everyday water can contain impurities, so it should not automatically be described as a pure substance.",
          "Dissolving salt in water produces a mixture called a solution. The crystals are no longer distinguishable, but the salt remains in the water."
        ]
      },
      {
        "title": "What changes during dissolving",
        "paragraphs": [
          "After adding the specified portion of salt, you can see crystals. As they dissolve, they are no longer visible. Stirring usually speeds up dissolving, but salt can also dissolve without stirring.",
          "For the future experiment, a teacher will select the water volume, salt portion and conditions for complete dissolving. Time and particle drawings are simplified. Heating and precise solubility calculations are outside this lesson."
        ]
      },
      {
        "title": "Explain what you observe",
        "paragraphs": [
          "Under the chosen conditions, the result is a homogeneous mixture: its components cannot be distinguished with the unaided eye. Not seeing crystals does not prove there is no salt.",
          "The salt does not disappear and no new chemical element is created. This learning model does not show a new substance forming. Never test for salt by tasting: use the properties and observations you have studied."
        ]
      }
    ],
    "glossary": [
      {
        "term": "Mixture",
        "definition": "A combination of two or more substances."
      },
      {
        "term": "Solution",
        "definition": "A homogeneous mixture whose components cannot be distinguished with the unaided eye."
      },
      {
        "term": "Dissolving",
        "definition": "The formation of a solution through interaction between a solute and a solvent."
      },
      {
        "term": "Homogeneous mixture",
        "definition": "A mixture whose components cannot be distinguished with the unaided eye."
      }
    ],
    "questions": [
      {
        "id": "composition",
        "prompt": "What does the salt solution contain?",
        "correct": "both",
        "options": [
          {
            "id": "only-water",
            "label": "Only water",
            "feedback": "Water is present, but the dissolved salt remains too."
          },
          {
            "id": "element",
            "label": "A new chemical element",
            "feedback": "Dissolving does not create a new element. Both water and salt remain."
          },
          {
            "id": "both",
            "label": "Water and dissolved salt",
            "feedback": "Correct: the solution contains both components and is a mixture."
          }
        ]
      },
      {
        "id": "disappear",
        "prompt": "The crystals are no longer visible. Has the salt disappeared?",
        "correct": "remains",
        "options": [
          {
            "id": "gone",
            "label": "Yes, the salt has ceased to exist",
            "feedback": "The salt remains in the solution even though its crystals are no longer visible."
          },
          {
            "id": "remains",
            "label": "No, the salt is still in the solution",
            "feedback": "Correct: no visible crystals does not mean no salt."
          },
          {
            "id": "gas",
            "label": "Yes, all the salt has become a gas",
            "feedback": "This activity does not produce gas. The salt remains dissolved in water."
          }
        ]
      }
    ]
  },
  "filtration": {
    "version": 1,
    "title": "How to separate sand from water",
    "goal": "Choose filtration and distinguish residue from filtrate.",
    "sections": [
      {
        "title": "A heterogeneous mixture",
        "paragraphs": [
          "Sand particles can be distinguished in a mixture of sand and water. In this model the sand does not dissolve in water. This is a heterogeneous mixture.",
          "Filtration through the chosen paper filter can separate these insoluble particles. Unlike dissolving, this separates components that are already present."
        ]
      },
      {
        "title": "Where the components go",
        "paragraphs": [
          "Secure the funnel in a holder, place a receiving vessel below it and fit a prepared filter into the funnel. Your teacher will explain how to prepare the filter and pour during a real activity.",
          "In the model, the mixture passes through the filter. Sand stays on it as the residue. Liquid that passes into the vessel is the filtrate. Separation speed and completeness are simplified."
        ]
      },
      {
        "title": "What the filter cannot do",
        "paragraphs": [
          "The suitable paper filter retains the selected sand particles, but it does not remove dissolved salt from water. It cannot separate a salt solution into salt and water by this filtration.",
          "Separating the mixture does not create a new substance. The retained sand is not a precipitate formed by a reaction. Even clear filtered water is not guaranteed safe to drink: ordinary filtration does not prove that."
        ]
      }
    ],
    "glossary": [
      {
        "term": "Filtration",
        "definition": "Separating a mixture by passing it through a suitable filter."
      },
      {
        "term": "Residue",
        "definition": "Material retained on the filter."
      },
      {
        "term": "Filtrate",
        "definition": "Liquid that has passed through the filter."
      },
      {
        "term": "Heterogeneous mixture",
        "definition": "A mixture in which components can be distinguished."
      }
    ],
    "questions": [
      {
        "id": "method",
        "prompt": "How can you separate sand from water in this activity?",
        "correct": "filter",
        "options": [
          {
            "id": "filter",
            "label": "Pass the mixture through a suitable filter",
            "feedback": "Correct: insoluble sand particles are retained while water passes through."
          },
          {
            "id": "stir",
            "label": "Only stir the mixture",
            "feedback": "Stirring alone does not separate the sand. A suitable separation method is filtration."
          },
          {
            "id": "dissolve",
            "label": "Dissolve the sand by stirring",
            "feedback": "The sand does not dissolve in this model. Its particles must be retained by a filter."
          }
        ]
      },
      {
        "id": "salt-filter",
        "prompt": "Will this paper filter remove dissolved salt from water?",
        "correct": "no",
        "options": [
          {
            "id": "yes",
            "label": "Yes, it will retain all the salt",
            "feedback": "Dissolved salt passes through this filter with the water. The filter is selected for sand particles."
          },
          {
            "id": "drink",
            "label": "Yes, and the water will definitely be drinkable",
            "feedback": "This filter neither removes dissolved salt nor guarantees the safety of the water."
          },
          {
            "id": "no",
            "label": "No, dissolved salt will pass through with the water",
            "feedback": "Correct: this filter separates sand, not dissolved salt."
          }
        ]
      }
    ]
  }
};
