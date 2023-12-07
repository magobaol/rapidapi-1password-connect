#!/bin/bash

# Create ./build directory if it doesn't exist
if [ ! -d "./build" ]; then
  mkdir ./build
fi

# Create ./build/it.francescoface.PawExtensions.1password-connect directory if it doesn't exist
if [ ! -d "./build/it.francescoface.PawExtensions.1password-connect" ]; then
  mkdir -p ./build/it.francescoface.PawExtensions.1password-connect
else
  # Delete everything inside /build/it.francescoface.PawExtensions.1password-connect
  rm -rf ./build/it.francescoface.PawExtensions.1password-connect/*
fi

# Copy all files from src into ./build/it.francescoface.PawExtensions.1password-connect
cp -r ./src/* ./build/it.francescoface.PawExtensions.1password-connect/

# Delete everything inside the target directory before copying
if [ -d ~/Library/Containers/com.luckymarmot.Paw/Data/Library/Application\ Support/com.luckymarmot.Paw/Extensions/it.francescoface.PawExtensions.1password-connect ]; then
  rm -rf ~/Library/Containers/com.luckymarmot.Paw/Data/Library/Application\ Support/com.luckymarmot.Paw/Extensions/it.francescoface.PawExtensions.1password-connect/*
fi

# Copy the directory it.francescoface.PawExtensions.1password-connect into the specified path
cp -r ./build/it.francescoface.PawExtensions.1password-connect ~/Library/Containers/com.luckymarmot.Paw/Data/Library/Application\ Support/com.luckymarmot.Paw/Extensions/