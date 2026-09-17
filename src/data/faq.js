export const faqCategories = [
  { id: 'getting-started', title: 'Getting Started' },
  { id: 'payments', title: 'Payments' },
  { id: 'cards', title: 'Cards & Transfers' },
  { id: 'security', title: 'Security' },
];
const groups = {
  'getting-started': [
    ['What is Payline?', 'Payline is a fintech website concept that brings payments, cards and savings planning into one experience. This website is a demonstration; it does not provide live banking services.'],
    ['How does Payline work?', 'Explore the feature sections, compare the benefits and use the growth calculator to model a savings plan. The calculator is interactive, while accounts and payment screens are previews.'],
    ['Can I open an account?', 'Account opening is not available in this demonstration. You can explore the interface without registering or providing personal information.'],
    ['How do I switch between light and dark mode?', 'Use the sun or moon button in the navigation bar. Your choice is saved in this browser when local storage is available.'],
    ['Can I use Payline on my phone?', 'Yes. This website adapts to phones, tablets and desktop screens. Open the menu in the navigation bar to access links on smaller screens.'],
    ['How do I try the growth calculator?', 'Scroll to “See your growth potential” and enter an initial deposit and monthly contribution. Adjust the years and estimated return to see your projection update.'],
  ],
  payments: [
    ['Can I make a payment on this website?', 'No real payments are processed here. The payment features illustrate the proposed Payline experience.'],
    ['Which payment methods are supported?', 'Live payment methods have not been configured for this demonstration. The interface should not be treated as confirmation of payment availability.'],
    ['Are the dashboard transactions real?', 'The dashboard uses sample balances and activity to demonstrate the design. These figures are not connected to a bank account.'],
    ['Does the calculator charge me anything?', 'No. Using the calculator does not move money, create a transaction or charge your account.'],
    ['How are savings projections calculated?', 'The calculator compounds the initial deposit monthly and adds monthly contributions at the end of each month, using the annual return you select.'],
    ['Are projected returns guaranteed?', 'No. Projections are illustrative estimates. Actual outcomes may differ, and the calculator does not account for fees, taxes or inflation.'],
    ['What happens if I choose a zero percent return?', 'The result is your initial deposit plus all monthly contributions, with no estimated investment growth.'],
    ['How can I reset my savings plan?', 'Select Reset in the calculator to restore an initial deposit of $20,000, monthly contributions of $500, a four-year period and an 8% illustrative annual return.'],
  ],
  cards: [
    ['Can I order a Payline card?', 'Card ordering is not available in this demonstration. The cards shown are visual examples.'],
    ['Can I transfer money?', 'This website does not initiate transfers or connect to bank accounts. Transfer controls in the preview are illustrative.'],
    ['Are the card details shown real?', 'The card artwork is sample content. It is not a usable payment card.'],
    ['Can I link an existing bank card?', 'No. There is no card-linking flow in this demo, and you should not enter real card details anywhere on the website.'],
    ['Are international transfers available?', 'International transfer availability, currencies and pricing have not been established for this demonstration.'],
    ['Where can I explore card benefits?', 'The Key Benefits section shows the card and rewards concepts included in the Payline design. These previews are not active product offers.'],
    ['Does changing the calculator move money?', 'No. Calculator inputs only change an illustrative projection in your browser. They do not create deposits or transfers.'],
  ],
  security: [
    ['Do I need to provide personal information?', 'No personal or banking information is required to explore this demonstration. Use hypothetical amounts in the calculator.'],
    ['What does the website save in my browser?', 'The theme switcher saves your light or dark preference under payline-theme when browser storage is available.'],
    ['Are my calculator values saved after refresh?', 'No. Calculator values are kept in memory for the current page session and return to their defaults after a refresh.'],
    ['Is this website connected to my bank?', 'No. This demonstration has no live banking connection and cannot access or change your bank balance.'],
    ['How can I protect my financial information?', 'Do not share passwords, card details or one-time codes through a demonstration website. Use your financial provider’s verified channels for account-specific help.'],
  ],
};
export const faqArticles = Object.entries(groups).flatMap(([category, entries]) => entries.map(([question, answer], index) => ({ id: `${category}-${index}`, category, question, answer })));
