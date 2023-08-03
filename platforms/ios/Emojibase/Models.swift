import Foundation

public struct EmojibaseStore {
    var categories: [String: [Emoji]]
}

public extension EmojibaseStore {
    func emojisFor(category: EmojibaseCategory) -> [Emoji]? {
        return categories[category.rawValue]
    }
    
    var allEmojis: [Emoji] {
        Array(categories.values.joined())
    }
}

public struct Emoji: Codable {
    let group: Int?
    let hexcode: String
    let label: String
    let order: Int?
    let tags: [String]?
    let unicode: String
    let skins: [EmojiSkin]?
}

public struct EmojiSkin: Codable {
    let group: Int
    let hexcode: String
    let label: String
    let order: Int
    let unicode: String
}

public enum EmojibaseCategory: String, Codable, CaseIterable {
    case people
//
//    case control
    case nature
    case foods
    case places
    case activity
    case objects
    case symbols
    case flags
}
