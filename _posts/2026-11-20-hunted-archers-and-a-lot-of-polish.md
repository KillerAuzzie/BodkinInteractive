---
title: "Hunted: archers, a red night, and a lot of polish"
subtitle: "The island learns to fight back."
description: "Release notes for the latest Fields of Renown build: the Day 6 Hunted night, bandit archers, smarter sword fights, archery that levels up, wet ground in the rain, and a long list of fixes."
tags: [Development, Release Notes, Combat]
---

This update started as a few combat fixes and turned into one of the biggest builds yet. The short
version: the island now has a night that hunts you, bandits can shoot back, sword fights read your
choices, and the bow finally feels like a bow. Here's everything that changed.

## The Hunted night

On the sixth night, the island turns on you.

At midnight the screen goes black and you wake at your tent (if you were asleep, something wakes
you). **YOU ARE HUNTED.** Then: **KILL THEM ALL.** The sky turns a stormy blood red, lightning splits
it, and the moon rises red. Wolves and bandits come for you from the prayer statue in three waves,
and there's no outrunning them.

Survive all three and the screen fades out. You wake at your tent in the morning, healed, the storm
blown over. Die, and the night starts again from midnight.

> It only happens once per save, so make it count.

## New enemy: bandit archers

Bandits can now carry bows. Archers hold their distance, about twenty metres out, and look for a clear
line on you. When they raise the bow and you hear the string pull back, you have a second and a bit
to move. They lead their shots, so running in a straight line is a bad idea.

Get close and they don't panic. They walk backwards, bow still up, and keep shooting. You'll have to
chase them down to finish them with a sword.

They join the bandits who attack when the escape boat washes ashore, and they're part of the Hunted
night.

## Sword fights that read you

Combat got a full pass, aiming for the feel of Mount & Blade:

- **Picking a direction** now follows your latest mouse movement instead of getting stuck, with a
  clean set of chevrons around the crosshair showing your choice.
- **Bandits read your direction.** When a bandit guards, it guards against the side you've picked,
  a moment late. Switch at the last second and you can get past it. Put your sword away and they
  stop guarding and come straight at you.
- **Every strike takes the same time** now, so attacks are easier to read and they line up with when
  they can actually hit.
- **Stamina:** swings cost a little stamina but you can always swing. Running low stops you
  sprinting instead. You can't attack mid-sprint, and you can't sprint for a moment after a swing or
  block.
- **Your sword hangs at your left hip** when it's away, and putting it away plays a proper sheathing
  animation.

## Archery that grows with you

Archery is now a real skill. You earn experience for every arrow you loose and more for every
creature you hit. As it levels up you reload faster, your arrows spread less and your reticle
steadies. Strength sends your arrows flying faster.

The bow itself got some love too:

- Drawing the bow slows you to a walk and you can't jump until you lower it.
- Flame arrows burn at the tip, show on the arrow while it's nocked, and use a smaller, tidier flame.
- New recorded sounds for drawing, nocking and loosing, plus a rush of air as the arrow leaves.
- Arrows sound different depending on what they hit: flesh, wood, stone, metal or earth.

## Wolves that mean it

Wolves had a rough few builds. They're fixed:

- They notice you reliably and **run** you down, instead of wandering off or walking at you.
- They no longer lose you halfway through a chase.
- A navigation problem that could leave every wolf and bandit standing still is gone.

## Rain you can see on the ground

When it rains, the ground soaks it up: it darkens, picks up a wet sheen and pools into puddles on flat
ground. When the rain stops it slowly dries out again. Storms soak everything; a light shower leaves
it damp.

## Menus, settings and sound

- The game now opens with the Unreal Engine and Bodkin Interactive logos.
- The main menu has proper rain and wind again, and the campfire is no longer blurry.
- Resolution changes actually apply now.
- The pause menu is centred, and the save box no longer sits on top of it.
- A new **Console** option in the Gameplay settings (press **~** once it's on).
- Enemy voices, combat hits and footsteps now fade with distance instead of playing across the whole
  island.
- The skill book's total level now counts archery.
- The sleep message now simply says you can only sleep late at night.

## Under the hood

The Linux build had a crash on AMD graphics drivers, and was missing a few things that only exist in
code, like the escape boat, some prompts, the bandits and the thunder. Both are fixed. We also cleared
out a lot of leftover template code and old test levels, so the project is leaner and quicker to work
on.

## What's next

Next up is more testing of the Hunted night and the archers, a Windows build, and then back to the
backlog. As always, come and tell us what you think on [Discord](https://discord.gg/sqXW4r2nw9).
