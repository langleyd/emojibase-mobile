import Foundation

struct EmojibaseStore {
    var categories: [String: [Emoji]]
}

extension EmojibaseStore {
    func emojisFor(category: Category) -> [Emoji]? {
        return categories[category.rawValue]
    }
    
    var allEmojis: [Emoji] {
        Array(categories.values.joined())
    }
}

struct Emoji: Codable {
    let group: Int?
    let hexcode: String
    let label: String
    let order: Int?
    let tags: [String]?
    let unicode: String
    let skins: [EmojiSkin]?
}

struct EmojiSkin: Codable {
    let group: Int
    let hexcode: String
    let label: String
    let order: Int
    let unicode: String
}

enum Category: String, Codable, CaseIterable {
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
