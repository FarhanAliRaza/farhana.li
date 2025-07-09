---
title: 'Complete Linux Development Environment Setup: Zsh, Oh My Zsh, Powerlevel10k, uv, pnpm, Git SSH, and Custom Functions'
slug: 'complete-linux-dev-environment-guide-arch-ubuntu-ohmyzsh-zsh-powerlevel10k'
description: 'Transform your Linux terminal into a powerful development environment with Zsh, Oh My Zsh, Powerlevel10k theme, uv package manager, pnpm, NVM, Git SSH setup, and custom aliases. Complete setup guide for Ubuntu and Arch Linux.'
date: '2025-07-09'
tags:
  [
    'zsh',
    'oh-my-zsh',
    'powerlevel10k',
    'terminal',
    'ubuntu',
    'arch-linux',
    'nerd-fonts',
    'uv',
    'pnpm',
    'nvm',
    'git-ssh',
    'development-environment',
    'custom-functions'
  ]
published: true
---

Every time I installed a new operating system, I went on a spree to find the blogs that worked last time. So I decided to consolidate all that into one blog for me and anyone else like me.

Ready to supercharge your Linux terminal? This guide will walk you step-by-step through setting up a development environment using Zsh, Oh My Zsh, the Powerlevel10k theme, Nerd Fonts, uv (for Python), pnpm (for Node.js), NVM, Git SSH keys, and a collection of custom aliases and functions. Whether you're on Ubuntu or Arch Linux, you'll end up with a fast, beautiful terminal tailored for development.

## Prerequisites

Before starting, make sure you have:

- A Linux distribution (Ubuntu 20.04+ or Arch Linux)
- Git installed

## Step 1: Install Zsh

### For Ubuntu/Debian:

```bash
sudo apt update
sudo apt install zsh
```

### For Arch Linux:

```bash
sudo pacman -S zsh
```

Verify the installation:

```bash
zsh --version
```

## Step 2: Change Shell

Check if zsh is available

```bash
chsh -l
```

If it is available then change your default shell to zsh

```bash
chsh -s /usr/bin/zsh
```

Logout and then login again.

```bash
echo $SHELL
# /usr/bin/zsh
```

## Step 3: Install Fonts

Powerlevel10k requires a Font for proper icon display. Let's install one:

### For Ubuntu/Debian (Powerline Font):

```bash
# Install required packages
sudo apt-get install fonts-powerline
# clear cache if required
fc-cache

```

### For Arch Linux:

I like to use [getnf](https://github.com/getnf/getnf) in arch linux to install fonts. Same powerline font may work here also but i have not tried it.

```bash
curl -fsSL https://raw.githubusercontent.com/getnf/getnf/main/install.sh | bash
```

or using aur helper

```bash
yay -S getnf
```

```bash
getnf
```

and then choose a font of you liking and install it.

```bash
#remove cache if required
fc-cache
```

## Step 4: Install Oh My Zsh

Install [Oh My Zsh](https://github.com/ohmyzsh/ohmyzsh/tree/master) using the official installer:

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

This will:

- Install Oh My Zsh
- Backup your existing shell configuration
- Set Zsh as your default shell

## Step 5: Install Powerlevel10k Theme

Clone the Powerlevel10k theme repository:

```bash
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
```

## Step 6: Configure Powerlevel10k

1. Open your Zsh configuration file:

```bash
nano ~/.zshrc
```

2. Change the theme line to:

```bash
ZSH_THEME="powerlevel10k/powerlevel10k"
```

3. Save and reload the configuration:

```bash
source ~/.zshrc
```

4. The Powerlevel10k configuration wizard will start automatically. Follow the prompts to customize your prompt. Here are some recommended settings:

- **Character Set**: Choose Unicode (supports all symbols)
- **Prompt Style**: Classic (more traditional) or Rainbow (more colorful)
- **Show current time**: Yes (useful for timing commands)
- **Prompt flow**: Concise (cleaner look)
- **Enable transient prompt**: Yes (clears previous prompt when scrolling)
- **Instant prompt**: Yes (faster startup)

If it does not start automatically

```bash
p10k configure
```

## Step 7: Install Useful Plugins

Oh My Zsh comes with many plugins. Let's add some popular ones. Edit your `~/.zshrc`:

```bash
plugins=(
    git # adds [git shortcuts](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/git)
    zsh-autosuggestions
    zsh-syntax-highlighting
)
```

Do not use a comma between plugins, i have done that ;)

### Install Additional Plugins:

```bash
# Zsh Autosuggestions
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

# Zsh Syntax Highlighting
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

## Step 8: Configure Your Terminal

### For GNOME Terminal (Ubuntu):

1. Open Terminal Preferences
2. Go to your profile settings
3. In the "Text" tab, change the font to new installed font.
4. Set font size to 12-14 for optimal readability

```bash
fc-list #to see all installed fonts
```

### For VS Code and Cursor Terminal:

Set the terminal font to `DroidSansM Nerd Font Mono` or whatever font you installed. in your editor settings:

**VS Code**: Settings → Search "terminal font" → Set "Terminal › Integrated: Font Family" to `DroidSansM Nerd Font Mono`

Or add to your settings.json:

```json
{
	"terminal.integrated.fontFamily": "'DroidSansM Nerd Font Mono', monospace"
}
```

## Step 9: Customize Your Configuration

Add these useful aliases and settings to your `~/.zshrc`:

```bash

alias ll='ls -la'
alias la='ls -A'
alias l='ls -CF'
alias ..='cd ..'
alias ...='cd ../..'
alias ....='cd ../../..'

# Git aliases
alias gs='git status'
alias gc='git commit -m'
alias gpf='git push --force'
# soft reset last commit
alias greset='git reset --soft HEAD~1'

# node pnpm aliases

alias npx='pnpx'
alias npm='pnpm'
alias dev='pnpm dev'
alias build='pnpm build'


# Docker aliases
alias d='docker'
alias dc='docker compose'
alias dps='docker ps'
alias dex='docker exec -it'

# Python aliases
alias py='python3'
alias pip='pip3'
alias svp='source .venv/bin/activate' # i use sv cli for svelte so no sv
alias venv='uv venv'

# System aliases
alias update='sudo apt update && sudo apt upgrade'  # For Ubuntu
alias update='sudo pacman -Syu'  # For Arch Linux

# Custom functions
function mkcd() {
  mkdir -p "$1" && cd "$1"
}

# Extract any archive
# usage: extract <file>
# example: extract file.tar.gz

extract() {
    if [ -f $1 ] ; then
        case $1 in
            *.tar.bz2)   tar xjf $1     ;;
            *.tar.gz)    tar xzf $1     ;;
            *.bz2)       bunzip2 $1     ;;
            *.rar)       unrar e $1     ;;
            *.gz)        gunzip $1      ;;
            *.tar)       tar xf $1      ;;
            *.tbz2)      tar xjf $1     ;;
            *.tgz)       tar xzf $1     ;;
            *.zip)       unzip $1       ;;
            *.Z)         uncompress $1  ;;
            *.7z)        7z x $1        ;;
            *)          echo "'$1' cannot be extracted via extract()" ;;
        esac
    else
        echo "'$1' is not a valid file"
    fi
}


```

## Step 10: Install `uv` and `pnpm`

Install [uv](https://docs.astral.sh/uv/getting-started/installation/#standalone-installer):

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### Node and pnpm

```bash
# Download and install nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# in lieu of restarting the shell
\. "$HOME/.nvm/nvm.sh"

# Download and install Node.js. At this time this is the lts version
# Visit [Node.js site](https://nodejs.org/en/download) to check lts version:
nvm install 22

# Verify the Node.js version:
node -v # Should print "v22.17.0".
nvm current # Should print "v22.17.0".

# Download and install pnpm:
corepack enable pnpm

# Verify pnpm version:
pnpm -v

```

If for some reason you are still not able to execute pnpm or nvm
Add this to ~/.zshrc

```bash
# NVM (Node Version Manager) configuration
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/nvm.sh.lazy" ] && \. "$NVM_DIR/nvm.sh.lazy"  # This loads nvm lazily
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# pnpm configuration
export PNPM_HOME="$HOME/.local/share/pnpm"
```

## Step 11: Git ssh key setup

Generate your ssh key

```bash
ssh-keygen -t ed25519 -C "farhan@farhana.li" # your email, this is not a valid email
```

```bash
eval `ssh-agent`
# Agent pid 1234
```

```bash
ssh-add ~/.ssh/id_ed25519
```

Add you public key to your github keys

```bash
cat ~/.ssh/id_ed25519.pub
```

For more info, visit [GitHub SSH documentation](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent).

Finally, you're all done!

### Performance Issues

If Zsh feels slow:

1. Disable some plugins you don't use
2. Use the "instant prompt" feature of Powerlevel10k
3. Consider using a lighter theme if needed

#### Remember: restarting terminal always helps.

## Step 12: Final Configuration

After all installations, reload your configuration if necessary:

```bash
source ~/.zshrc
```

### Congratulations 🎉 You have finally done it. Now bookmark this as you will definitely need this in near future.
