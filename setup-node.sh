#!/bin/bash

nvm_version=$(nvm version)
desired_version=$(cat .nvmrc)

# Check if nvm is installed
if [[ "$nvm_version" == "" ]]; then
    echo "NVM is not installed. Please install it first."
    exit 1
fi

# Check if the desired version is installed
if ! nvm ls | grep -q "$desired_version"; then
    echo "Installing Node version $desired_version..."
    nvm install $desired_version
else
    echo "Node version $desired_version already installed."
fi

# Set the desired version for the current shell
nvm use $desired_version
