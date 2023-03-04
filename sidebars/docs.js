/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

const CodeElements = {
	Class: 'sidebar-code sidebar-class-name',
	Func: 'sidebar-code sidebar-function',
	Method: 'sidebar-code sidebar-method',
	Operator: 'sidebar-code sidebar-operator-function',
};

const parseFlags = (flags) => {
	if (typeof flags === 'string')
		return ' sidebar-flag-' + flags;
	else if (Array.isArray(flags))
		return ' ' + flags.map(e => 'sidebar-flag-' + e).join(' ');
	return '';
}

const docsClass = (id, flags=[]) => ({
		id,
		type: 'doc', 
		className: CodeElements.Class + parseFlags(flags)
	});
const docsMethod = (id, flags=[]) => ({
		id,
		type: 'doc', 
		className: CodeElements.Method + parseFlags(flags)
	});
const docsFunction = (id, flags=[]) => ({
		id,
		type: 'doc', 
		className: CodeElements.Func + parseFlags(flags)
	});
const docsOperator = (id, flags=[]) => ({
		id,
		type: 'doc', 
		className: CodeElements.Operator + parseFlags(flags)
	});

const separatorBase = (content='<span/>', classes='sidebar-separator') => ({
			type: 'html',
			value: content,
			className: classes,
			defaultStyle: true,
		});

const sep = separatorBase();
const cat = (name) => separatorBase(`<span>${name}</span>`, 'sidebar-separator sidebar-category');

const parseClassItemShorthand = (id, e, flags=[]) => {
	if (typeof e !== 'string')
	{
		if (Array.isArray(e))
			return parseClassItemShorthand(id, e[0], e[1])
		else
			return e;
	}

	if (e.startsWith("f:")) // function
		return docsFunction(`${id}/${e.substr(2)}`, flags);
	else if (e.startsWith("m:")) // method
		return docsMethod(`${id}/${e.substr(2)}`, flags);
	else if (e.startsWith("op:")) // method
		return docsOperator(`${id}/${e.substr(3)}`, flags);
	else
		return `${id}/${e}`;
}

const docsClassCat = (label, id, flags, contents) => ({
		type: 'category',
		className: CodeElements.Class + parseFlags(flags),
		label,
		link: { type: 'doc', id: id },
		items: contents.map(e => parseClassItemShorthand(id, e))
	});


module.exports = {
	defaultSidebar: [
		'index',
		'useful-links',
		{
			type: 'category',
			label: 'Standard Library',
			collapsed: false,
			link: { type: 'doc', id: 'std/index' },
			items: [
				{
					type: 'category',
					label: 'Math',
					items: [
						{
							type: 'category',
							label: 'Mathematical Functions',
							link: { type: 'doc', id: 'std/math/mathematical_functions/index' },
							items: [
								docsClassCat('Abs', 'std/math/mathematical_functions/abs', '', ['f:labs',]),
							],
						},
						'std/math/mathematical_special_functions',
						'std/math/numeric_algorithms',
					]
				},
				{
					type: 'category',
					label: 'Containers',
					link: { type: 'doc', id: 'std/containers/index' },
					items: [
						{
							type: 'category',
							label: 'Arrays',
							link: { type: 'doc', id: 'std/containers/arrays/index' },
							items: [
								docsClassCat('array', 'std/containers/arrays/array', 'since-cpp11', [
										cat('Element access'),
										'm:at',
										'op:operator_subscript',
										'm:front',
										'm:back',
										'm:data',
										cat('Iterators'),
										'm:begin',
										'm:end',
										'm:rbegin',
										'm:rend',
										cat('Capacity'),
										'm:empty',
										'm:size',
										'm:max_size',
										cat('Operations'),
										'm:fill',
										'm:swap',
										cat('Non-member functions'),
										['f:to_array', 'since-cpp20'],
									]),
								docsClassCat('initializer_list', 'std/containers/arrays/initializer_list', 'since-cpp11', [
										'constructor',
										cat('Capacity'),
										'm:size',
										cat('Iterators'),
										'm:begin',
										'm:end',
									]),
								docsClassCat('vector', 'std/containers/arrays/vector', '', [
									'constructors',
									'destructor',
									'op:operator_assign',
									'm:assign',
									'm:get_allocator',
									cat('Element access'),
									'm:at',
									'op:operator_subscript',
									'm:front',
									'm:back',
									'm:data',
									cat('Iterators'),
									['m:begin', 'since-cpp11'],
									['m:end', 'since-cpp11'],
									['m:rbegin', 'since-cpp11'],
									['m:rend', 'since-cpp11'],
									cat('Capacity'),
									'm:empty',
									'm:size',
									'm:max_size',
									'm:capacity',
									'm:reserve',
									['m:shrink_to_fit', 'since-cpp11'],
									cat('Modifiers'),
									'm:clear',
									'm:insert',
									['m:emplace', 'since-cpp11'],
									'm:erase',
									'm:push_back',
									['m:emplace_back', 'since-cpp11'],
									'm:pop_back',
									'm:resize',
									'm:swap',
								]),
							]
						},
						{
							type: 'category',
							label: 'Strings',
							link: { type: 'doc', id: 'std/containers/strings/index' },
							items: [
								docsClassCat('string', 'std/containers/strings/string', '', [
									'constructors',
									'op:operator_assign',
									'm:assign',
									'm:get_allocator',
									cat('Element access'),
									'm:at',
									'op:operator_subscript',
									[ 'm:front', 'since-cpp11' ],
									[ 'm:back', 'since-cpp11' ],
									'm:data',
									'm:c_str',
									[ 'op:operator_string_view', 'since-cpp23' ],
									cat('Iterators'),
									[ 'op:begin', 'since-cpp11' ],
									[ 'op:end', 'since-cpp11' ],
									[ 'op:rbegin', 'since-cpp11' ],
									[ 'op:rend', 'since-cpp11' ],
									cat('Capacity'),
									'm:empty',
									'm:size',
									'm:max_size',
									'm:reserve',
									'm:capacity',
									[ 'shrink_to_fit', 'since-cpp11' ],
									cat('Operations'),
									'm:clear',
									'm:insert',
									'm:erase',
									'm:push_back',
									[ 'm:pop_back', 'since-cpp11' ],
									'm:append',
									'op:operator_addeq',
									'm:compare',
									[ 'm:starts_with', 'since-cpp20' ],
									[ 'm:ends_with', 'since-cpp20' ],
									[ 'm:contains', 'since-cpp23' ],
									'm:replace',
									'm:substr',
									'm:copy',
									'm:resize',
									[ 'm:resize_and_overwrite', 'since-cpp23' ],
									'm:swap',
									cat('Search'),
									'm:find',
									'm:rfind',
									'm:find_first_of',
									'm:find_first_not_of',
									'm:find_last_of',
									'm:find_last_not_of',
								]),
								docsClassCat('string_view', 'std/containers/strings/string_view', '', [
									'constructors',
									'op:operator_assign',
									cat('Element access'),
									'm:at',
									'op:operator_subscript',
									'm:front',
									'm:back',
									'm:data',
									cat('Iterators'),
									'm:begin',
									'm:end',
									'm:rbegin',
									'm:rend',
									cat('Capacity'),
									'm:empty',
									'm:size',
									'm:max_size',
									cat('Modifiers'),
									'm:remove_prefix',
									'm:remove_suffix',
									'm:swap',
									cat('Operations'),
									'm:copy',
									'm:substr',
									'm:compare',
									[ 'm:starts_with', 'since-cpp20'],
									[ 'm:ends_with', 'since-cpp20'],
									[ 'm:compare', 'since-cpp23'],
									'm:find',
									'm:rfind',
									'm:find_first_of',
									'm:find_first_not_of',
									'm:find_last_of',
									'm:find_last_not_of'
								]),
							]
						},
						{
							type: 'category',
							label: 'Queues',
							link: { type: 'doc', id: 'std/containers/queues/index' },
							items: [
								docsClassCat('queue', 'std/containers/queues/queue', '', [
									'constructors',
									'destructors',
									'op:operator_assign',
									cat('Element access'),
									'm:front',
									'm:back',
									cat('Capacity'),
									'm:empty',
									'm:size',
									cat('Modifiers'),
									'm:push',
									'm:pop',
									['m:emplace', 'since-cpp11'],
									['m:swap', 'since-cpp11'],
								]),
								docsClassCat('deque', 'std/containers/queues/deque', '', [
									'constructors',
									'destructor',
									'op:operator_assign',
									'm:assign',
									'm:get_allocator',
									cat('Element access'),
									'm:at',
									'op:operator_subscript',
									'm:front',
									'm:back',
									cat('Iterators'),
									['m:begin', 'since-cpp11'],
									['m:end', 'since-cpp11'],
									['m:rbegin', 'since-cpp11'],
									['m:rend', 'since-cpp11'],
									cat('Capacity'),
									'm:empty',
									'm:size',
									'm:max_size',
									['m:shrink_to_fit', 'since-cpp11'],
									cat('Modifiers'),
									'm:clear',
									'm:insert',
									['m:emplace', 'since-cpp11'],
									'm:erase',
									'm:push_back',
									['m:emplace_back', 'since-cpp11'],
									'm:pop_back',
									'm:push_front',
									['m:emplace_front', 'since-cpp11'],
									'm:pop_front',
									'm:resize',
									'm:swap'
								]),
								docsClass('std/containers/queues/priority-queue'),
							]
						},
						{
							type: 'category',
							label: 'Maps and dictionaries',
							link: { type: 'doc', id: 'std/containers/maps/index' },
							items: [
								docsClassCat('map', 'std/containers/maps/map', '', [
									'constructors',
									'destructor',
									'op:operator_assign',
									'm:get_allocator',
									cat('Element acccess'),
									'm:at',
									'op:operator_subscript',
									cat('Iterators'),
									['m:begin', 'since-cpp11'],
									['m:end', 'since-cpp11'],
									['m:rbegin', 'since-cpp11'],
									['m:rend', 'since-cpp11'],
									cat('Capacity'),
									'm:empty',
									'm:size',
									'm:max_size',
									cat('Modifiers'),
									'm:clear',
									'm:insert',
									['m:insert_or_assign', 'since-cpp17'],
									['m:emplace', 'since-cpp11'],
									['m:emplace_hint', 'since-cpp11'],
									['m:try_emplace', 'since-cpp17'],
									'm:erase',
									'm:swap',
									['m:extract', 'since-cpp17'],
									['m:merge', 'since-cpp17'],
									cat('Lookup'),
									'm:count',
									'm:find',
									['m:contains', 'since-cpp20'],
									'm:equal_range',
									'm:lower_bound',
									'm:upper_bound',
									cat('Observers'),
									'm:key_comp',
									'm:value_comp',
									'm:value_compare',

								]),
								docsClassCat('multimap', 'std/containers/maps/multimap', '', [
									'constructors',
									'destructor',
									'op:operator_assign',
									'm:get_allocator',
									cat('Iterators'),
									['m:begin', 'since-cpp11'],
									['m:end', 'since-cpp11'],
									['m:rbegin', 'since-cpp11'],
									['m:rend', 'since-cpp11'],
									cat('Capacity'),
									'm:empty',
									'm:size',
									'm:max_size',
									cat('Modifiers'),
									'm:clear',
									'm:insert',
									['m:emplace', 'since-cpp11'],
									['m:emplace_hint', 'since-cpp11'],
									'm:erase',
									'm:swap',
									['m:extract', 'since-cpp17'],
									['m:merge', 'since-cpp17'],
									cat('Lookup'),
									'm:count',
									'm:find',
									['m:contains', 'since-cpp20'],
									'm:equal_range',
									'm:lower_bound',
									'm:upper_bound',
									cat('Observers'),
									'm:key_comp',
									'm:value_comp',
								]),
								docsClassCat('unordered_map', 'std/containers/maps/unordered-map', '', [
									'constructors',
									'destructors',
									'op:operator_assign',
									'm:get_allocator',
									cat('Element access'),
									'm:at',
									'op:operator_subscript',
									cat('Iterators'),
									'm:begin',
									'm:end',
									cat('Capacity'),
									'm:empty',
									'm:size',
									'm:max_size',
									cat('Modifiers'),
									'm:clear',
									'm:insert',
									['m:insert_or_assign', 'since-cpp17'],
									'm:emplace',
									'm:emplace_hint',
									['m:try_emplace', 'since-cpp17'],
									'm:erase',
									'm:swap',
									['m:extract', 'since-cpp17'],
									['m:merge', 'since-cpp17'],
									cat('Lookup'),
									'm:count',
									'm:find',
									['m:contains', 'since-cpp20'],
									'm:equal_range',
									cat('Bucket interface'),
									'm:begin_size_type',
									'm:end_size_type',
									'm:bucket_count',
									'm:max_bucket_count',
									'm:bucket_size',
									'm:bucket',
									cat('Hash policy'),
									'm:load_factor',
									'm:max_load_factor',
									'm:rehash',
									'm:reserve',
									cat('Observers'),
									'm:hash_function',
									'm:key_eq'
								]),
								docsClassCat('unordered_multimap', 'std/containers/maps/unordered-multimap', '', [
									'constructors',
									'destructors',
									'op:operator_assign',
									'm:get_allocator',
									cat('Iterators'),
									'm:begin',
									'm:end',
									cat('Capacity'),
									'm:empty',
									'm:size',
									'm:max_size',
									cat('Modifiers'),
									'm:clear',
									'm:insert',
									'm:emplace',
									'm:emplace_hint',
									'm:erase',
									'm:swap',
									['m:extract', 'since-cpp17'],
									['m:merge', 'since-cpp17'],
									cat('Lookup'),
									'm:count',
									'm:find',
									'm:contains',
									'm:equal_range',
									cat('Bucket interface'),
									'm:begin_size_type',
									'm:end_size_type',
									'm:bucket_count',
									'm:max_bucket_count',
									'm:bucket_size',
									'm:bucket',
									cat('Hash policy'),
									'm:load_factor',
									'm:max_load_factor',
									'm:rehash',
									'm:reserve',
									cat('Observers'),
									'm:hash_function',
									'm:key_eq'
								])
							]
						},
						{
							type: 'category',
							label: 'Sets',
							link: { type: 'doc', id: 'std/containers/sets/index' },
							items: [
								docsClassCat('set', 'std/containers/sets/set', '', [
									'constructors',
									'destructors',
									'op:operator_assign',
									'm:get_allocator',
									cat('Iterators'),
									['m:begin', 'since-cpp11'],
									['m:end', 'since-cpp11'],
									['m:rbegin', 'since-cpp11'],
									['m:rend', 'since-cpp11'],
									cat('Capacity'),
									'm:empty',
									'm:size',
									'm:max_size',
									cat('Modifiers'),
									'm:clear',
									'm:insert',
									['m:emplace', 'since-cpp11'],
									['m:emplace_hint', 'since-cpp11'],
									'm:erase',
									'm:swap',
									['m:extract', 'since-cpp17'],
									['m:merge', 'since-cpp17'],
									cat('Lookup'),
									'm:count',
									'm:find',
									['m:contains', 'since-cpp20'],
									'm:equal_range',
									'm:lower_bound',
									'm:upper_bound',
									cat('Observers'),
									'm:key_comp',
									'm:value_comp',
								]),
								docsClassCat('unordered_set', 'std/containers/sets/unordered-set', '', [
									'constructors',
									'destructors',
									'op:operator_assign',
									'm:get_allocator',
									cat('Iterators'),
									'm:begin',
									'm:end',
									cat('Capacity'),
									'm:empty',
									'm:size',
									'm:max_size',
									cat('Modifiers'),
									'm:clear',
									'm:insert',
									['m:emplace', 'since-cpp11'],
									['m:emplace_hint', 'since-cpp11'],
									'm:erase',
									'm:swap',
									['m:extract', 'since-cpp17'],
									['m:merge', 'since-cpp17'],
									cat('Lookup'),
									'm:count',
									'm:find',
									['m:contains', 'since-cpp20'],
									'm:equal_range',
									cat('Bucket interface'),
									'm:begin_size_type',
									'm:end_size_type',
									'm:bucket_count',
									'm:max_bucket_count',
									'm:bucket_size',
									'm:bucket',
									cat('Hash policy'),
									'm:load_factor',
									'm:max_load_factor',
									'm:rehash',
									'm:reserve',
									cat('Observers'),
									'm:hash_function',
									'm:key_eq',
								]),
								docsClassCat('multiset', 'std/containers/sets/multiset', '', [
									'constructors',
									'destructors',
									'op:operator_assign',
									'm:get_allocator',
									cat('Iterators'),
									['m:begin', 'since-cpp11'],
									['m:end', 'since-cpp11'],
									['m:rbegin', 'since-cpp11'],
									['m:rend', 'since-cpp11'],
									cat('Capacity'),
									'm:empty',
									'm:size',
									'm:max_size',
									cat('Modifiers'),
									'm:clear',
									'm:insert',
									['m:emplace', 'since-cpp11'],
									['m:emplace_hint', 'since-cpp11'],
									'm:erase',
									'm:swap',
									['m:extract', 'since-cpp17'],
									['m:merge', 'since-cpp17'],
									cat('Lookup'),
									'm:count',
									'm:find',
									['m:contains', 'since-cpp20'],
									'm:equal_range',
									'm:lower_bound',
									'm:upper_bound',
									cat('Observers'),
									'm:key_comp',
									'm:value_comp',
								]),
								docsClassCat('unordered_multiset', 'std/containers/sets/unordered-multiset', '', [
									'constructors',
									'destructors',
									'op:operator_assign',
									'm:get_allocator',
									cat('Iterators'),
									['m:begin', 'since-cpp11'],
									['m:end', 'since-cpp11'],
									cat('Capacity'),
									'm:empty',
									'm:size',
									'm:max_size',
									cat('Modifiers'),
									'm:clear',
									'm:insert',
									'm:emplace',
									'm:emplace_hint',
									'm:erase',
									'm:swap',
									['m:extract', 'since-cpp17'],
									['m:merge', 'since-cpp17'],
									cat('Lookup'),
									'm:count',
									'm:find',
									['m:contains', 'since-cpp20'],
									'm:equal_range',
									cat('Bucket interface'),
									'm:begin_size_type',
									'm:end_size_type',
									'm:bucket_count',
									'm:max_bucket_count',
									'm:bucket_size',
									'm:bucket',
									cat('Hash policy'),
									'm:load_factor',
									'm:max_load_factor',
									'm:rehash',
									'm:reserve',
									cat('Obervers'),
									'm:hash_function',
									'm:key_eq',
								])

							]
						},
						{
							type: 'category',
							label: 'Lists',
							link: { type: 'doc', id: 'std/containers/lists/index' },
							items: [
								docsClassCat('forward-list', 'std/containers/lists/forward-list', '', [
									'constructors',
									'destructor',
									'op:operator_assign',
									'm:assign',
									'm:get_allocator',
									cat('Element access'),
									'm:front',
									cat('Iterators'),
									'm:before_begin',
									'm:begin',
									'm:end',
									cat('Capacity'),
									'm:empty',
									'm:max_size',
									cat('Modifiers'),
									'm:clear',
									'm:insert_after',
									'm:emplace_after',
									'm:erase_after',
									'm:push_front',
									'm:emplace_front',
									'm:pop_front',
									'm:resize',
									'm:swap',
									cat('Operations'),
									'm:merge',
									'm:splice_after',
									'm:remove',
									'm:reverse',
									'm:unique',
									'm:sort',
								]),
							]
						},
						{
							type: 'category',
							label: 'Other',
							link: { type: 'doc', id: 'std/containers/other/index' },
							items: [
								docsClassCat('span', 'std/containers/other/span', '', [
									'constructors',
									'op:operator_assign',
									cat('Element access'),
									'm:front',
									'm:back',
									'op:operator_subscript',
									'm:data',
									cat('Iterators'),
									'm:begin',
									'm:end',
									'm:rbegin',
									'm:rend',
									cat('Observers'),
									'm:size',
									'm:size_bytes',
									'm:empty',
									cat('Subviews'),
									'm:first',
									'm:last',
									'm:subspan',
								]),
								docsClassCat('stack', 'std/containers/other/stack', '', [
									'constructors',
									'destructors',
									'op:operator_assign',
									cat('Element access'),
									'm:top',
									cat('Capacity'),
									'm:empty',
									'm:size',
									cat('Modifiers'),
									'm:push',
									['m:emplace', 'since-cpp11'],
									'm:pop',
									['m:swap', 'since-cpp11'],
								]),
							]
						}
					]
				},
				{
					type: 'category',
					label: 'Utility',
					items: [
						docsMethod('std/utility/forward', 'since-cpp11'),
					]
				},
			],
		},
	],
};