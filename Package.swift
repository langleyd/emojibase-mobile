// swift-tools-version: 5.8
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "emojibase-mobile",
    platforms: [
         .iOS(.v16),
     ],
    products: [
        .library(
            name: "emojibase-mobile",
            targets: ["emojibase-mobile"]),
    ],
    targets: [
        .target(
            name: "emojibase-mobile",
            path: "platforms/ios/emojibase-mobile",
            resources: [.process("Resources")]
        ),
        .testTarget(
            name: "emojibase-mobileTests",
            dependencies: ["emojibase-mobile"],
            path: "platforms/ios/emojibase-mobileTests"
        ),
    ]
)
