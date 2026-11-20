---
title: "Engine Selection: Godot vs Unreal"
subtitle: "Engine? Liam Lawson doesn't need a engine to crash a car"
description: How we weighed Godot and Unreal for Fields of Renown, and why Unreal Engine 5 won.
tags: [Development, Technical, Engine]
redirect_from:
  - /blog-post-engine-selection/
  - /blog-post-engine-selection.html
---

As we continue developing Fields of Renown, one of the most critical decisions we face is choosing the right game engine. This choice will fundamentally shape not only the technical capabilities of our medieval sandbox RPG but also the visual fidelity, performance, and development workflow.

After months (over a year hehe) of research, prototyping, and community discussions, we've narrowed our choice down to two powerful contenders: **Godot Engine** and **Unreal Engine**. Each brings unique strengths to the table, and today we want to share our (me, our sounds better) analysis with you.

## The Contenders

### Godot Engine

Godot has emerged as a powerful open-source alternative that's gaining significant traction in the indie game development community. Its recent 4.0 release brought substantial improvements to both 2D and 3D capabilities, making it a serious contender for our medieval RPG.

#### Godot advantages

- **Open Source Freedom:** Complete freedom to modify and extend the engine as needed
- **Zero Cost:** No licensing fees or revenue sharing requirements
- **Lightweight Architecture:** Smaller file sizes and faster compilation times
- **Active Community:** Passionate community with regular updates and improvements
- **Cross-Platform Excellence:** Outstanding support for multiple platforms out of the box
- **Node-Based Scene System:** Intuitive and flexible scene organization
- **GDScript:** Python-like scripting language that's easy to learn and use

#### Godot considerations

- **Ecosystem Maturity:** Smaller asset marketplace compared to established engines
- **3D Performance:** Still catching up to industry leaders for complex 3D scenes
- **Learning Resources:** Fewer tutorials and documentation compared to Unreal
- **Industry Adoption:** Less proven in large-scale commercial projects

### Unreal Engine

Unreal Engine has long been the industry standard for high-fidelity 3D games, powering everything from indie titles to AAA blockbusters (like SQUAD haha seed ULD). Its robust feature set and proven track record make it an attractive option for Fields of Renown's ambitious medieval world.

#### Unreal advantages

- **Industry Standard:** Battle-tested technology used in countless successful games
- **Visual Excellence:** Cutting-edge graphics capabilities and rendering features
- **Comprehensive Toolset:** Complete development environment with professional tools
- **Massive Ecosystem:** Huge marketplace with professional assets and plugins
- **Blueprint System:** Visual scripting that accelerates development
- **Documentation:** Extensive official documentation and learning resources
- **Performance Optimization:** Highly optimized for various platforms and hardware

#### Unreal considerations

- **Learning Curve:** More complex to master, especially for new developers
- **Resource Requirements:** Higher system requirements for development
- **Revenue Sharing:** 5% royalty after $1 million in gross revenue
- **Project Size:** Larger build sizes and longer compilation times
- **Overkill Factor:** Might be more complex than needed for our scope

## Our Evaluation Criteria

To make an informed decision, we're evaluating both engines across several key criteria that are crucial for Fields of Renown's success:

| Criteria | Godot | Unreal |
| --- | --- | --- |
| **Development Speed** | Fast iteration, simple workflow | Powerful tools, steeper learning curve |
| **Visual Quality** | Good, improving rapidly | Industry-leading graphics |
| **Performance** | Efficient for our scope | Highly optimized, scalable |
| **Cost** | Completely free | Free until $1M revenue |
| **Community** | Growing, passionate indie focus | Large, professional-oriented |
| **Platform Support** | Excellent cross-platform | Comprehensive platform support |

### Fields of Renown specific requirements

Our medieval sandbox RPG has some specific technical requirements that influence our engine choice:

- **Open World Environment:** Seamless Welsh countryside with varied terrain
- **Dynamic Weather:** Realistic weather systems affecting gameplay
- **Medieval Architecture:** Detailed castles, villages, and period-accurate buildings
- **Character Systems:** Complex player and NPC interaction systems
- **Economic Simulation:** Real-time economy and trading mechanics
- **Multiplayer Capability:** Future-proofing for community features

## Community Input

We've been actively seeking input from our Discord community, and the feedback has been incredibly valuable. Many of you have shared experiences with both engines, highlighting real-world considerations we might have missed.

> "Its a diffcult choice to make between the two choice but Unreal 5 standouts due to its wide spread use as well as the integration with blueprints and C++"
>
> *Filthy Crab*

## Testing Phase

We created test scenarios in both engines to evaluate their real-world performance for our specific use cases. Our test builds include:

### Technical prototypes

1. **Terrain Generation:** Creating varied Welsh landscapes with hills, valleys, and water bodies
2. **Weather Implementation:** Dynamic weather systems with gameplay impact
3. **Architecture Showcase:** Medieval buildings with authentic period details
4. **Character Controllers:** Movement, combat, and interaction systems
5. **Economy Systems:** Basic trading and resource management mechanics
6. **Performance Testing:** Frame rates and optimization across different hardware

## Decision

We went through the testing phase and decided that **Unreal Engine 5** is the best fit for Fields of Renown. Due to the powerful 3D engine Unreal 5, we can create a more immersive and realistic world.

## What's Next?

We are glad to finalize this decision and move forward with the development of Fields of Renown. This decision will mark a major milestone in Fields of Renown's development, allowing us to:

- Begin development of the core systems
- Water making
- Fishing logic in C++
- Start building the foundation of our medieval world, including a testing map
- Begin early alpha testing with community members

## Stay Connected

We'll be posting regular updates on our progress, including development insights, technical challenges, and sneak peeks of our work. If you're interested in following along, make sure to join our Discord community and stay tuned for more!

**The future of Fields of Renown is in your hands, and we can't wait to build this medieval world together!**
