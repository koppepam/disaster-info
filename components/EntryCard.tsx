import FormattedTime from "./FormattedTime";

type Props = {
  time: string | Date,
  title: string,
  index: number,
  children: React.ReactNode
}
// 震源関係のカード　表示なおす

export default function EntryCard (props: Props) {
  return (
    <div data-accordion='collapse' className='w-full break-words border-b mx-10 py-5 block max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'>
      <FormattedTime time={props.time} format='YYYY/MM/DD HH:mm:ss' />
      <button id={`accordion-collapse-heading${props.index}`} className='flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3' data-accordion-target={`#accordion-collapse-body${props.index}`} aria-expanded='true' aria-controls={`accordion-collapse-body${props.index}`}>
        <span className='title'>{props.title}</span>
        <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
        </svg>
      </button>
      <div id={`accordion-collapse-body${props.index}`} className='hidden p-5 border border-b-0 border-gray-200 dark:border-gray-700' aria-labelledby={`accordion-collapse-heading${props.index}`}>
        {props.children}
      </div>
    </div>
  );
}