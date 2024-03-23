const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_SECRET_KEY,
});

async function main(input) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are assisting the Crisp technical support team. You'll analyze data to determine if the Crisp chatbox is visible based on the following rules:
    
          1. 'online' - If false, support is away, but chatbox is still visible by default.
          2. 'hide_vacation' - If true, chatbox is hidden.
          3. 'hide_on_away' - If true and 'online' is false, chatbox is hidden.
          4. 'check_domain' - If true, chatbox is only visible on 'website_url'.
          5. 'allowed_pages' - If specified, chatbox is only visible here.
          6. 'blocked_pages' - If a page is listed here, chatbox is hidden.
          7. 'blocked_countries' or 'blocked_locales' - If they match the user's location or browser language, chatbox is hidden.
          8. If 'online' is false and 'hide_on_away' is false, chatbox is visible.
          9. 'helper tips' - Optional. These are additional information to help you generate your response and troubleshoot the chatbox visibility.`,
      },
      {
        role: "user",
        content: `current page: http://localhost:5173/debug
          website settings:
          online: true,
          website_url: false,
          hide_vacation: false,
          hide_on_away: true,
          check_domain: false,
          allowed_pages: ,
          blocked_pages: https://staging.crisp.help/en/category/workarounds-nj20g7/,https://staging.crisp.help/en/category/workarounds-nj20g7/*,https://staging.crisp.help/en/category/testing-jej7kv/,https://staging.crisp.help/en/category/testing-jej7kv/*,
          blocked_countries: ,
          blocked_locales: ,`,
      },
      {
        role: "assistant",
        content: `Given your current settings, the chatbox should be visible on your current page (http://localhost:5173/debug). But please note, the chatbox will be hidden on the following blocked pages:
          
          - https://staging.crisp.help/en/category/workarounds-nj20g7/
          - https://staging.crisp.help/en/category/workarounds-nj20g7/*
          - https://staging.crisp.help/en/category/testing-jej7kv/
          - https://staging.crisp.help/en/category/testing-jej7kv/*
          
          The "Hide on away" setting is set to true, meaning the chatbox will be hidden if the website's support team is offline.`,
      },
      {
        role: "user",
        content: `current page: http://localhost:5173/debug?
          website settings:
          online: true,
          website_url: acme.com,
          hide_vacation: true,
          hide_on_away: true,
          check_domain: false,
          allowed_pages: ,
          blocked_pages: ,
          blocked_countries: ,
          blocked_locales: EN,`,
      },
      {
        role: "assistant",
        content: `Since the "Hide on vacation" setting is enabled, the chatbox won't be visible anywhere. Additionally, English locale is blocked, which means users with 'English' as their browser language preference won't see the chatbox.`,
      },
      {
        role: "user",
        content: `current page: http://localhost:5173/debug?
          website settings:
          online: false,
          website_url: gimini.com,
          hide_vacation: false,
          hide_on_away: false,
          check_domain: true,
          allowed_pages: ,
          blocked_pages: ,
          blocked_countries: ,
          blocked_locales: ,`,
      },
      {
        role: "assistant",
        content: `Due to the "Lock Domain" setting being on, the chatbox isn't visible on your current page, but it should appear just fine on the gimini.com domain.`,
      },
      {
        role: "user",
        content: `current page: http://localhost:5173/debug?
          website settings:
          online: false,
          website_url: acme.com,
          hide_vacation: false,
          hide_on_away: true,
          check_domain: false,
          allowed_pages: https://chrisp-sandbox.herokuapp.com/articles/**, https://chrisp-sandbox.herokuapp.com/dashboard/**
          blocked_pages: ,
          blocked_countries: FR, UK,
          blocked_locales: ,`,
      },
      {
        role: "assistant",
        content: `With "Hide on away" enabled and the support team currently offline, the chatbox won't be visible. However, the chatbox will be visible only on the following allowed pages:
    
          - https://chrisp-sandbox.herokuapp.com/articles/**
          - https://chrisp-sandbox.herokuapp.com/dashboard/**
          
          The chatbox won't be visible to users from France and the United Kingdom.`,
      },
      {
        role: "user",
        content: `current page: http://localhost:5173/debug?
          website settings:
          online: true,
          website_url: theenergycompany.com,
          hide_vacation: false,
          hide_on_away: false,
          check_domain: true,
          allowed_pages: ,
          blocked_pages: https://theenergycompany.com/dashboard/**,
          blocked_countries: ,
          blocked_locales: ,`,
      },
      {
        role: "assistant",
        content: `Due to the locked-domain option, the chatbox won't appear on your Sandbox but it will be visible on theenergycompany.com, except on the following page:
    
          - https://theenergycompany.com/dashboard/**`,
      },
      {
        role: "user",
        content: `current page: http://localhost:5173/debug?
          website settings:
          online: false,
          website_url: ,
          hide_vacation: false,
          hide_on_away: false,
          check_domain: false,
          allowed_pages: ,
          blocked_pages: ,
          blocked_countries: IT, USA,
          blocked_locales: de,`,
      },
      {
        role: "assistant",
        content: `The chatbox should be visible, since the website is offline but "Hide on away" is not enabled. However, the chatbox won't be visible to users from USA, Italy and users with German as their browser language preference.`,
      },
      {
        role: "user",
        content: `current page: http://localhost:5173/debug
          website settings:
          online: false,
          website_url: "domain.com",
          hide_vacation: false,
          hide_on_away: false,
          check_domain: true,
          allowed_pages: ["https://domain.com/page1", "https://domain.com/page2"],
          blocked_pages: [],
          blocked_countries: ["CA", "MX"],
          blocked_locales: ["fr", "es"],`,
      },
      {
        role: "assistant",
        content: `Given these settings, the chatbox is only visible on 'https://domain.com/page1' and 'https://domain.com/page2' because of the 'check_domain' and 'allowed_pages' settings. Users in Canada (CA) and Mexico (MX), or users with French (fr) or Spanish (es) browser language settings, will not be able to see the chatbox.`,
      },
      {
        role: "user",
        content: `current page: http://localhost:5173/debug
          website settings:
          online: true,
          website_url: ,
          hide_vacation: false,
          hide_on_away: true,
          check_domain: false,
          allowed_pages: ["https://domain.com/page1", "https://domain.com/page2"],
          blocked_pages: ["https://domain.com/page3"],
          blocked_countries: [],
          blocked_locales: [],`,
      },
      {
        role: "assistant",
        content: `The chatbox should currently be visible, as the support is online. However, the chatbox will be hidden if the support team is offline, because the 'hide_on_away' setting is enabled. It's visible on 'https://domain.com/page1' and 'https://domain.com/page2', but not on 'https://domain.com/page3'.`,
      },
      {
        role: "user",
        content: input,
      },
    ],
  });

  console.log(completion.choices[0]?.message?.content);
  return completion.choices[0]?.message?.content;
}

exports.handler = async function (event, context) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  try {
    const requestBody = JSON.parse(event.body);
    const prompt = requestBody.prompt;

    if (!prompt) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "Prompt is required" }),
      };
    }

    const answer = await main(prompt);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: answer }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Internal Server Error",
        error: error.toString(),
      }),
    };
  }
};
