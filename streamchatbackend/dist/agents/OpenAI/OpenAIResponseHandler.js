"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAIResponseHandler = void 0;
class OpenAIResponseHandler {
    constructor(openai, openAiThread, chatClient, channel, message, onDisposeL) {
        this.openai = openai;
        this.openAiThread = openAiThread;
        this.chatClient = chatClient;
        this.channel = channel;
        this.message = message;
        this.onDisposeL = onDisposeL;
        this.message_text = "";
        this.chunk_counter = 0;
        this.run_id = "";
        this.is_done = false;
        this.last_update_time = 0;
        this.run = async () => { };
        this.dispose = async () => { };
        this.handleStopGenerating = async (event) => { };
        this.handleStreamEvent = async (event) => { };
        this.handleError = async (error) => {
            if (this.is_done) {
                return;
            }
            await this.channel.sendEvent({
                type: "ai_indicator.update",
                ai_state: "AI_STATE_ERROR",
                cid: this.message.cid,
                message_id: this.message.id
            });
            // write here from tomorrow
        };
        this.performWebSearch = async (query) => {
            process.env.TAVILY_API_KEY;
            if (!TAVILY_API_KEY) {
                return JSON.stringify({
                    error: "Web search is not available, API Key not configured.",
                });
            }
            console.log(`Performing a web search for ${query}`);
            try {
                const response = await fetch("https://api.tavily.com/search", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${TAVILY_API_KEY}`
                    },
                    body: JSON.stringify({
                        query: query,
                        search_depth: "advanced",
                        max_result: 5,
                        include_answer: true,
                        include_raw_content: false
                    })
                });
                if (!response.ok) {
                    const errorText = await response.text();
                    console.log(`Tavily  search failed for query "${query}:`, errorText);
                    return JSON.stringify({
                        error: `Search failed with status: ${response.status}`,
                        deatils: errorText
                    });
                }
                const data = await response.json();
                console.log(`Tavily search successful for query: ${query}`);
                return JSON.stringify(data);
            }
            catch (error) {
                console.error(`An exception occured during web search for ${query}`);
                return JSON.stringify({
                    error: "An exception occured during web search",
                });
            }
        };
        this.chatClient.on("ai_indicator.stop", this.handleStopGenerating);
    }
}
exports.OpenAIResponseHandler = OpenAIResponseHandler;
//# sourceMappingURL=OpenAIResponseHandler.js.map