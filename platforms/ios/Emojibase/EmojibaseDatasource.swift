import Foundation

public struct EmojibaseDatasource {
    private static var jsonFile: URL? {
        Bundle.module.url(forResource: "emojibase", withExtension: "json")
    }
    
    public func load() async throws -> EmojibaseStore {
        guard let jsonDataURL = Self.jsonFile else {
            throw DatasourceError.fileNotFound
        }
        do {
            let data = try Data(contentsOf: jsonDataURL)
            do {
                let categories = try JSONDecoder().decode([String:[Emoji]].self, from: data)
                return EmojibaseStore(categories: categories)
            } catch {
                print("error \(error)")
                throw DatasourceError.failedToParse(error)
            }
        } catch {
            print("error \(error)")
            throw DatasourceError.failedToLoadData(error)
        }
    }
    
    enum DatasourceError: Error {
        case fileNotFound
        case failedToLoadData(Error)
        case failedToParse(Error)
    }
}
