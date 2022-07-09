# Buff Macaron

Buff Macaron is a Discord bot for the HARUMAKI GOHAN server!

## Features

- Can lure wild riceball eaters
- Can clean your room (WIP)
- Will burn your house (WIP)

## Getting Started

### Prerequisites

- Node.js (v16.16.0 or higher)
- [Discord Bot Application](https://discord.com/developers/applications)

### Installation & Usage

1. Clone or download the repository

   ```sh
   $ git clone https://github.com/Jilling22/Macaron-bot.git
   ```

2. Install npm packages

   ```sh
   $ npm install
   ```

3. Create a `.env` file in the root directory `/` and set all environment variables you find in `.env.example`

4. Run the discord bot

   ```
   $ npm start
   ```

5. For development, run the following command instead

   ```
   $ npm run dev
   ```

## VSCode Configuration

This section will guide you to setup VSCode for developing.

### Plugins

#### Required

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

#### Recommended

- [Better Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments)
- [Bracket Pair Colorizer 2](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer-2)
- [Color Highlight](https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight)
- [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)
- [One Dark Pro](https://marketplace.visualstudio.com/items?itemName=zhuangtongfa.Material-theme)
- [GitLens - Git supercharged](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
- [Visual Studio IntelliCode](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode)

### ESLint

> ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code, with the goal of making code more consistent and avoiding bugs.

After installing the ESLint extension you should see a double check mark next to `ESLint` in the bottom right corner of VSCode. The plugin will load the configuration from `.eslintrc`. If you have troubles, click on `ESLint` to open the output console for more information.

![Working ESLint](Images/docs/eslint-working.png)

### Prettier

> Prettier is an opinionated code formatter. It removes all original styling and ensures that all outputted code conforms to a consistent style. Prettier takes your code and reprints it from scratch by taking the line length into account.

After installing the Prettier extension you should see it in the bottorm right corner of VSCode. The plugin will load the configuration from `.prettierrc`. You need to activate it now by formatting your code. It should have a check mark now if it works.

```
Ctrl + Shift + P > "Format Document"
```

![Working Prettier](Images/docs/prettier-working.png)

#### Format on Save

It is highly recommended to turn this feature on in VSCode. It will automatically format your code with Prettier by just saving the file. It will save you time and energy.

1. Open Settings

   ```
   Ctrl + ,
   ```

   or

   ```
   Ctrl + Shift + P > "Preferences: Open Settings (UI)"
   ```

2. Search for `Format On Save`

3. Tick the checkbox for `Editor: Format On Save`

![Format on Save Setting](Images/docs/format-on-save.png)

## License

Distributed under the ISC License. See `LICENSE` for more information.

## Contributors

- Jilling22
- Weepy
