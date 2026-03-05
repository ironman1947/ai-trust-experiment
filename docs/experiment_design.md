# AI Trust Experiment Design

## Research Question
Does a humanlike AI agent name increase user reliance on AI recommendations compared to a neutral system label?

## Independent Variable
AI agent presentation.

Two conditions will be used:
- Neutral AI system label
- Humanlike AI assistant name

## Experimental Conditions

Condition A: Neutral AI
Agent Name: "AI System"

Example display:
AI System Recommendation
Product B
Confidence: 72%

Condition B: Humanlike AI
Agent Name: "Alex"

Example display:
Hi, I'm Alex.
I recommend Product B.

## Decision Task

Participants will choose between two products based on ratings.

Example:

Product A  
Rating: 4.6 / 5

Product B  
Rating: 4.2 / 5

The AI assistant recommends one of the options.

Participants can either:
- Accept the AI recommendation
- Override the AI recommendation

## Trial Design

Each participant completes 5 trials.

Trials include both correct and incorrect AI recommendations
to introduce uncertainty and measure trust behavior.

## AI Recommendation Accuracy

The AI assistant's recommendation accuracy is fixed at approximately
60% (3 out of 5 trials correct).

This creates a calibrated uncertainty environment in which
participants cannot assume the AI is always correct.

The design allows measurement of both:

- Appropriate reliance when the AI is correct
- Overtrust when the AI is incorrect.

## Logged Data

Each interaction logs the following fields:

participant_id  
trial_number  
condition  
decision  
confidence_score  
latency_ms  
ai_correct  
timestamp  

## Participant Flow

1. User opens the experiment
2. Participant ID is generated
3. Condition is randomly assigned
4. Trial task is displayed
5. User makes decision
6. User reports confidence
7. Event is logged

## Manipulation Check

After completing the trials, participants will answer a simple
manipulation check question to confirm that the experimental cue
was noticed.

Example question:

"What was the name of the AI assistant you interacted with?"

Options:
- AI System
- Alex
- I do not remember

This ensures the participant processed the experimental manipulation.