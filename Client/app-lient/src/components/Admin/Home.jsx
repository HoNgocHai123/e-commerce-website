import { LineChart } from '@mui/x-charts';
import { PieChart } from '@mui/x-charts/PieChart';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-7xl mx-auto">
                {/* Overview cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {/* Card 1 */}
                    <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold">10,368</h2>
                        <p className="mt-2">Members online</p>
                        <div className="h-16 mt-4 bg-white bg-opacity-20 rounded-lg"></div>
                    </div>
                    {/* Card 2 */}
                    <div className="bg-gradient-to-r from-green-400 to-teal-500 text-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold">388,688</h2>
                        <p className="mt-2">Items sold</p>
                        <div className="h-16 mt-4 bg-white bg-opacity-20 rounded-lg"></div>
                    </div>
                    {/* Card 3 */}
                    <div className="bg-gradient-to-r from-pink-500 to-orange-500 text-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold">1,086</h2>
                        <p className="mt-2">This week</p>
                        <div className="h-16 mt-4 bg-white bg-opacity-20 rounded-lg"></div>
                    </div>
                    {/* Card 4 */}
                    <div className="bg-gradient-to-r from-green-400 to-lime-500 text-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold">$1,080,386</h2>
                        <p className="mt-2">Total earnings</p>
                        <div className="h-16 mt-4 bg-white bg-opacity-20 rounded-lg"></div>
                    </div>
                </div>

                {/* Recent Reports and Chart */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Recent Reports */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-bold mb-4">Recent Reports</h3>
                        <div className="h-48 bg-gray-200 rounded-lg flex justify-center items-center">
                            <PieChart
                                series={[
                                    {
                                        data: [
                                            { name: 'Category A', value: 400 },
                                            { name: 'Category B', value: 300 },
                                            { name: 'Category C', value: 300 },
                                            { name: 'Category D', value: 200 }
                                        ],
                                        innerRadius: 20,    
                                        outerRadius: 60,    
                                        paddingAngle: 5,
                                        cornerRadius: 5,
                                        startAngle: -45,
                                        endAngle: 225,
                                        cx: 100,            
                                        cy: 100,            
                                    }
                                ]}
                                width={200}            
                                height={200}           
                            />

                        </div>
                    </div>

                    {/* Chart By % */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-bold mb-4">Chart By %</h3>
                        <div className="h-48 bg-gray-200 rounded-lg flex justify-center items-center">
                            <LineChart
                                xAxis={[{ data: [1, 2, 3, 4, 5, 6] }]}
                                series={[
                                    { data: [20, 30, 25, 40, 35, 50] },
                                ]}
                                width={400} 
                                height={200}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
