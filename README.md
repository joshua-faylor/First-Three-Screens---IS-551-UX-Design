# Meal Match

Meal Match is a small UX prototype designed to help busy college students quickly discover meal ideas and save the ones they may want to make later.

The prototype focuses on one core experience: helping students spend less time deciding what to eat while still finding affordable, varied meal options.

## 1. Need, Persona, Capability, and Value

### Need

College students often have limited time and money for meal planning. Classes, work, homework, and social commitments can make it difficult to decide what to eat and prepare meals consistently. As a result, students may rely on eating out, repeat the same meals, or skip meals altogether.

### Persona

College students, married or single, who have busy schedules, limited food budgets, and little time to plan meals or cook during the week.

### Primary Capability

Quickly discover simple meal ideas that fit a student's time, budget, and preferences.

### Fundamental Value

**Variety and time savings.** Students can spend less time deciding what to eat while still finding affordable meal options that keep their meals from becoming repetitive.

---

## 2. Three Screens

### Screen 1: Landing Screen

**Main Job:**
Communicate the app's core value and help users quickly understand what they can do.

**Why It Earned a Slot:**
This is the user's introduction to Meal Match and establishes the primary value of quickly finding and saving meal ideas.

**Design Question:**
Do students quickly understand what the app does and why it would be useful to them?

The revised landing screen keeps the message intentionally simple. The headline, **"Find something worth eating,"** is paired with two primary actions:

- Explore Meals
- Saved Meals

Supporting meal imagery helps communicate variety and food discovery without requiring additional explanatory text.

### Screen 2: Meal Discovery

**Main Job:**
Demonstrate the app's primary capability by helping users quickly discover meals that fit their needs.

**Why It Earned a Slot:**
This screen shows the core interaction of the product and directly demonstrates how Meal Match could reduce the time and effort required to decide what to eat.

**Design Question:**
Does the swipe-based interface provide enough information for students to make a quick decision without feeling overwhelmed?

Each meal includes a photo and a small group of useful descriptors, such as:

- Preparation time
- Difficulty
- Number of ingredients
- Cost level

Users can swipe left to skip a meal or right to save it. Directional icons also act as signifiers so users do not have to already understand swipe conventions.

An undo action allows users to immediately reverse a save or skip decision.

### Screen 3: Saved Meals

**Main Job:**
Allow users to return to meal ideas they previously found useful without searching for them again.

**Why It Earned a Slot:**
Saving meal ideas demonstrates the longer-term value of the discovery process by giving users a collection of meals they can reference later.

**Design Question:**
Do students understand how saving and organizing meal ideas could help them make meal decisions more quickly in the future?

The saved screen keeps organization lightweight with grouped filters such as:

- All
- Quick
- Cheap

The focus remains on returning to saved meal ideas rather than managing complicated folders or categories.

---

## 3. Feedback Question Plan

### Need

**Question:**
What do you usually do when you need to figure out what to eat for the week, and what is frustrating about that process?

**Prediction:**
I expect many students will say they reuse the same meals, search online for ideas, ask someone else, or decide at the last minute. I predict that the most common frustration will be the time and mental effort required to come up with new ideas. This prediction relates to the landing screen and the **Explore Meals** action, which is designed to reduce the effort of generating meal ideas.

### Value

**Question:**
What would a meal-planning tool have to do better than your current approach for you to actually use it?

**Prediction:**
I expect students will say that it would need to be faster and easier than searching for recipes or brainstorming meals on their own. They may also value being able to quickly find affordable meals that do not feel repetitive. This prediction relates to the discovery screen, where users can quickly evaluate meal options and save appealing ideas with minimal effort.

### Persona

**Question:**
What have you already tried when you want to find new meal ideas?

**Prediction:**
I expect students will mention searching Google, Pinterest, TikTok, recipe websites, asking friends or family, or simply brainstorming ideas themselves. Some may say they stop looking because there are too many options or because finding realistic meals takes too much time. This prediction relates to the discovery screen, which presents one manageable option at a time instead of requiring users to search through a large collection.

### Capability

**Question:**
Click around on this prototype and tell me what you think it is designed to help you do.

**Prediction:**
I expect users to quickly identify that the product helps them discover meal ideas, decide which ones they like, and save those meals for later. This prediction rests on the landing screen headline, the **Explore Meals** and **Saved Meals** buttons, the swipe interaction on the discovery screen, and the saved meals screen.

---

## 4. Design Justification and First Read

### Landing Screen

The landing screen now signals the primary capability and value more clearly at first glance.

The first version included several competing pieces of text, including:

- "Quick, budget-friendly, not repetitive"
- A supporting sentence explaining the product
- A secondary tagline
- Multiple meal cards
- A profile control

These elements gave too many things similar visual weight and made the primary capability less obvious.

The revised version removes unnecessary copy and keeps the primary hierarchy focused on:

1. **Find something worth eating**
2. **Explore Meals**
3. **Saved Meals**

The meal imagery supports the concept visually without becoming another content section.

This revision was motivated by the design question:
**Do students quickly understand what the app does and why it would be useful to them?**

### Discovery Screen

The first version included extra instructions, a meal counter, repeated labels, separate buttons, and a cost indicator that was visually separated from the other meal attributes.

The revised version reduces those elements and places the emphasis on the meal card itself.

The meal descriptors are grouped using **proximity, similarity, and alignment**. Preparation time, difficulty, ingredients, and cost appear together because they all support the same decision: whether the meal is worth saving.

The swipe controls use directional arrows and recognizable icons to strengthen signifiers:

- Left / X = Skip
- Right / Heart = Save

The entire card is swipeable, including both the image and the descriptive content.

An undo action was also added so users can immediately recover from an accidental save or rejection. This improves user control and reduces the cost of making a mistake.

These revisions were motivated by the design question:
**Does the swipe-based interface provide enough information for students to make a quick decision without feeling overwhelmed?**

### Saved Meals Screen

The saved meals screen was simplified to keep the focus on previously selected meals.

The revised screen removes:

- Favorites
- Favorite heart controls
- Extra navigation buttons
- Redundant headings

The remaining filters, **All, Quick, and Cheap**, are visually grouped because they perform the same function.

This screen stays on mission by helping users quickly return to meal ideas they already decided were useful.

### Navigation and Consistency

All three screens use the same bottom navigation:

- Home
- Discover
- Saved

This provides an obvious route back to the landing screen from anywhere in the prototype.

The screens also use consistent spacing, typography, controls, imagery, and layout patterns so they are perceived as parts of the same product.

---

## 5. Concrete Before-and-After Revision

One of the most important revisions was the discovery screen.

### Before

The original AI-generated screen included:

- Instructional text explaining how to swipe
- Separate Skip and Save buttons
- A meal counter
- A separate budget indicator
- Repeated labels
- No immediate way to undo a decision

The interface communicated the interaction partly through explanation rather than through strong signifiers.

### After

The revised screen:

- Removes unnecessary instructional text
- Uses left and right directional controls with recognizable icons
- Makes the entire meal card swipeable
- Groups all meal descriptors together
- Removes unnecessary status information
- Adds immediate undo functionality after saving or skipping

This revision improves **signaling, grouping, comprehension, and user control**.
Github Repo:
https://github.com/joshua-faylor/First-Three-Screens---IS-551-UX-Design

Initial version/commit:
https://github.com/joshua-faylor/First-Three-Screens---IS-551-UX-Design/commit/148dce2bdba3e80322165486289bd50d745ae97f

Revised live prototype:
https://superb-squirrel-d4c455.netlify.app
