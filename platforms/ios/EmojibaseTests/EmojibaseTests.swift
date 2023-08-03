import XCTest
@testable import Emojibase

final class emojibase_mobileTests: XCTestCase {
    func testExample() async throws {
        let data = try? await EmojibaseDatasource().load()
        let store = try XCTUnwrap(data)
        XCTAssertEqual(store.categories.count, Category.allCases.count)
        let people = try XCTUnwrap(store.emojisFor(category: .people))
        let emoji = try XCTUnwrap(people.first(where: { $0.label == "OK hand" }))
        let tags = try XCTUnwrap(emoji.tags)
        XCTAssertEqual(tags, ["hand", "ok"])
        let skins = try XCTUnwrap(emoji.skins)
        XCTAssertEqual(skins.count, 5)
        XCTAssertEqual(skins.last?.unicode, "👌🏿")
    
    }
}
