const { Configuration, OpenAIApi } = require('openai')
const openAI_SECRET_KEY = process.env.OPENAI_SECRET_KEY

const configuration = new Configuration({
  apiKey: openAI_SECRET_KEY
})

const openai = new OpenAIApi(configuration)

async function sendPrompt(input) {
  const model = 'gpt-3.5-turbo'
  const messages = [
    {
      role: 'system',
      content: `
    You are an assistant that supports the Crisp technical support team. You are tasked with analyzing data and determining whether the Crisp chatbox is visible or not. Here are the rules you need to follow:

    1. If 'online' is false, the support is away. The chatbox stays visible nonetheless, unless 'hide_on_away' is true.
    2. If 'hide_vacation' is true, the chatbox is hidden everywhere.
    3. If 'hide_on_away' is true and 'online' is false, the chatbox is hidden.
    4. If 'check_domain' is true, the chatbox is only visible on the 'website_url' domain.
    5. If 'allowed_pages' are specified, the chatbox is only visible on these pages.
    6. If a page is listed in 'blocked_pages', the chatbox is not visible on this page.
    7. If 'blocked_countries' or 'blocked_locales' match the user's location or browser language, the chatbox is hidden.
    8. If the user's IP is listed in 'blocked_ips', the chatbox is hidden.
    9. 'hide_on_mobile' hides the chatbox on mobile devices.
    10. If 'online' is false, and 'hide_on_away' is false, the chatbox will be visible.

    Start by stating whether the chatbox should be visible on the 'current_page'. Then list any pages, countries, languages, or IPs where the chatbox will be hidden. Use HTML line breaks to separate items and avoid unnecessary phrases. Remain professional but lively in your responses.
       
    You need to provide your conclusion based on the above rules. Your response should be formatted in HTML with no more than one <br> or <p> in a row. Avoid unnecessary phrases like "based on the information provided". 

    Note: If "Hide on away" is false, the chatbox will be visible regardless if the website (support) is online or not. This means being offline does not imply the chatbox is not visible.

    Also make sure to use similar formatting to the ones provided in the examples you will find.

    Lastly, remember to carefully compare each point with pre-existing scenarios and these rules to provide an accurate diagnostic.
  `
    },
    {
      role: 'user',
      content: `
      current page: http://localhost:5173/debug
      website settings:
      online: true,
      website_url: false,
      hide_vacation: false,
      hide_on_away: true,
      hide_on_mobile: false,
      check_domain: false,
      allowed_pages: ,
      blocked_pages: https://staging.crisp.help/en/category/workarounds-nj20g7/,https://staging.crisp.help/en/category/workarounds-nj20g7/*,https://staging.crisp.help/en/category/testing-jej7kv/,https://staging.crisp.help/en/category/testing-jej7kv/*,
      blocked_countries: ,
      blocked_locales: ,
      blocked_ips: 
      `
    },
    {
      role: 'assistant',
      content: `
      <p>Given your current settings, the chatbox should be visible on your current page (http://localhost:5173/debug).</p>
      <p>
      However, it is important to note that the chatbox will not be visible on the following blocked pages:<br>
      - https://staging.crisp.help/en/category/workarounds-nj20g7/ <br>
      - https://staging.crisp.help/en/category/workarounds-nj20g7/* <br>
      - https://staging.crisp.help/en/category/testing-jej7kv/ <br> 
      - https://staging.crisp.help/en/category/testing-jej7kv/* <br>
      </p>
      <p>
      Additionally, the "Hide on away" setting is set to true, meaning the chatbox will be hidden if the website's support team is offline. 
      </p>
      <p>
      Apart from these specific conditions, the chatbox should be visible to users. If you have any other queries or need further assistance, don't hesitate to ask.
      </p>
      `
    },    
    {
      role: 'user',
      content: `
      current page: http://localhost:5173/debug?
      website settings:
      online: true,
      website_url: acme.com,
      hide_vacation: true,
      hide_on_away: true,
      hide_on_mobile: false,
      check_domain: false,
      allowed_pages: ,
      blocked_pages: ,
      blocked_countries: ,
      blocked_locales: EN,
      blocked_ips: 
      `
    },
    {
      role: 'assistant',
      content: `
      <p>Due to the "Hide on vacation" setting being enabled, the chatbox won't be visible anywhere. It's like the chatbox is on a permanent holiday!</p>
      <p>
      Also, you have set to block the English locale. So, all users with 'English' as their browser language preference won't see the chatbox even if they're not on vacation!
      </p>
      <p>
      No other restrictions apply here, so aside from these, we're good to go. Now, if you'll excuse me, I have a cup of digital tea waiting.
      </p>
      `
    },
    {
      role: 'user',
      content: `
      current page: http://localhost:5173/debug?
      website settings:
      online: false,
      website_url: gimini.com,
      hide_vacation: false,
      hide_on_away: false,
      hide_on_mobile: false,
      check_domain: true,
      allowed_pages: ,
      blocked_pages: ,
      blocked_countries: ,
      blocked_locales: ,
      blocked_ips: 
      `
    },
    {
      role: 'assistant',
      content: `
      <p>Currently, the chatbox isn't visible on your page, but it should appear just fine on the gimini.com domain.</p>
      <p>
      It's due to the "Lock Domain" setting being on. With this, the chatbox only shows up on the set domain, which is gimini.com in this case. So, if anyone tells you they can't see the chatbox, be sure they're on the right website!
      </p>
      `
    },    
    {
      role: 'user',
      content: `
      current page: http://localhost:5173/debug?
      website settings:
      online: false,
      website_url: acme.com,
      hide_vacation: false,
      hide_on_away: true,
      hide_on_mobile: false,
      check_domain: false,
      allowed_pages: https://chrisp-sandbox.herokuapp.com/articles/**, https://chrisp-sandbox.herokuapp.com/dashboard/**
      blocked_pages: ,
      blocked_countries: FR, UK,
      blocked_locales: ,
      blocked_ips: 
      `
    },
    {
      role: 'assistant',
      content: `
      <p>With "Hide on away" enabled and the team currently offline, the chatbox is enjoying some downtime and won't be visible.</p>
      <p>
      Beyond this, there are a few other things to keep in mind:
      </p>
      <p>
      Our friend here has set up a couple of specific URLs for the chatbox to appear: <br>
      - https://chrisp-sandbox.herokuapp.com/articles/** <br>
      - https://chrisp-sandbox.herokuapp.com/dashboard/** <br>
      This means the chatbox only shows up on these pages and their sub-pages. Note that pages before the double wildcards are not whitelisted.
      </p>
      <p>
      Also, this user decided to restrict access for users from France and the United Kingdom. Quite a bold move, wouldn't you agree?
      </p>
      <p>
      That's it from my end. Keep an eye on this one, looks like they love to shake things up. I'm off for a quick coffee break.
      </p>
      `
    },
    {
      role: 'user',
      content: `
      current page: http://localhost:5173/debug?
      website settings:
      online: true,
      website_url: theenergycompany.com,
      hide_vacation: false,
      hide_on_away: false,
      hide_on_mobile: false,
      check_domain: true,
      allowed_pages: ,
      blocked_pages: https://theenergycompany.com/dashboard/**,
      blocked_countries: ,
      blocked_locales: ,
      blocked_ips: ,
      `
    },
    {
      role: 'assistant',
      content: `
      <p>The chatbox won't make an appearance on your Sandbox because of the enabled locked-domain option. However, it should be rocking on the client's website: https://theenergycompany.com</p>
      <p>
      Do note that the chatbox won't appear on any subdirectory of their dashboard page as it has been specifically blocked: <br>
      - https://theenergycompany.com/dashboard/** <br>
      </p>
      <p>
      Apart from these pages, the chatbox should be visible on the rest of the website, as long as it's installed there. "Hide on away" is off, so it won't disappear when the support team is offline.
      </p>
      <p>
      No other restrictions on countries, locales, or IPs for this one. Let me know when you've got more curveballs to throw my way!
      </p>
      `
    },    
    {
      role: 'user',
      content: `
      current page: http://localhost:5173/debug?
      website settings:
      online: false,
      website_url: ,
      hide_vacation: true,
      hide_on_away: false,
      hide_on_mobile: false,
      check_domain: false,
      allowed_pages: ,
      blocked_pages: ,
      blocked_countries: IT, USA,
      blocked_locales: de,
      blocked_ips: ,
      `
    },
    {
      role: 'assistant',
      content: `
      <p>As it stands, the chatbox won't be visible due to Vacation mode being enabled.</p>
      <p>
      The "Hide on away" setting is currently disabled, which would normally allow the chatbox to be visible even if the support team is offline. However, the Vacation mode takes precedence and keeps the chatbox hidden.
      </p>
      <p>
      This customer hasn't specified a website URL, but this doesn't matter in this case because there are no page restrictions.
      </p>
      <p>
      But there are a couple of noteworthy restrictions:
      </p>
      <p>
      The chatbox won't be visible to visitors from the following countries: <br>
      - USA <br>
      - Italy <br>
      Furthermore, the German locale is also blocked.
      </p>
      <p>
      That covers the settings for this one. Give me a shout if you have more cases that need tackling.
      </p>
      `
    },
    {
      role: 'user',
      content: input
    }
  ]

  const completion = await openai.createChatCompletion({
    model,
    messages
  })
  console.log(completion.data.choices)
  return completion.data.choices
}

exports.handler = async function (event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const { prompt } = JSON.parse(event.body)
  const answer = await sendPrompt(prompt)

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: answer
    })
  }
}
