import Foundation

public struct EmojibaseStore {
    public var categories: [String: [Emoji]]
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
    public  let hexcode: String
    public  let label: String
    let order: Int?
    public let tags: [String]?
    public let shortcodes: [String]
    public let unicode: String
    public let skins: [EmojiSkin]?
}

public struct EmojiSkin: Codable {
    let group: Int
    public let hexcode: String
    public let label: String
    let order: Int
    public let unicode: String
}

public enum EmojibaseCategory: String, Codable, CaseIterable {
    case people
    case nature
    case foods
    case activity
    case places
    case objects
    case symbols
    case flags
}
